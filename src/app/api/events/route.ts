import { NextRequest } from "next/server";
import { eventBus } from "@/whatsapp/events";
import { whatsappManager } from "@/whatsapp/client";

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const sendEvent = (event: string, data: unknown) => {
        try {
          const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
          controller.enqueue(encoder.encode(payload));
        } catch {
          // Stream might be closed
        }
      };

      // Send initial snapshot
      const status = whatsappManager.getStatus();
      const qr = eventBus.getQr();
      const pairingCode = eventBus.getPairingCode();
      const messages = eventBus.getMessages();

      sendEvent("init", {
        status,
        qr,
        pairingCode,
        messages: messages.slice(0, 20),
      });

      // Event listeners
      const onQr = (data: unknown) => sendEvent("qr", data);
      const onQrCleared = () => sendEvent("qr_cleared", {});
      const onPairingCode = (data: unknown) => sendEvent("pairing_code", data);
      const onState = (data: unknown) => sendEvent("state", data);
      const onMessage = (data: unknown) => sendEvent("message", data);

      eventBus.on("qr", onQr);
      eventBus.on("qr_cleared", onQrCleared);
      eventBus.on("pairing_code", onPairingCode);
      eventBus.on("state", onState);
      eventBus.on("message", onMessage);

      // Heartbeat interval to keep connection alive
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(": heartbeat\n\n"));
        } catch {
          clearInterval(heartbeat);
        }
      }, 15000);

      req.signal.addEventListener("abort", () => {
        clearInterval(heartbeat);
        eventBus.off("qr", onQr);
        eventBus.off("qr_cleared", onQrCleared);
        eventBus.off("pairing_code", onPairingCode);
        eventBus.off("state", onState);
        eventBus.off("message", onMessage);
        try {
          controller.close();
        } catch {
          // Ignore
        }
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
