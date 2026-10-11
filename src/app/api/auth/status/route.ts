import { NextResponse } from "next/server";
import { whatsappManager } from "@/whatsapp/client";
import { eventBus } from "@/whatsapp/events";

export async function GET() {
  const status = whatsappManager.getStatus();
  const qr = eventBus.getQr();
  const pairingCode = eventBus.getPairingCode();

  return NextResponse.json({
    success: true,
    ...status,
    qr,
    pairingCode,
  });
}
