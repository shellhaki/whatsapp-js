/**
 * Standalone Headless WhatsApp Bot CLI.
 *
 * Runs the bot with native ANSI terminal QR rendering, automatic command dispatching,
 * and graceful signal handling under Bun.
 */

import QRCode from "qrcode";
import { whatsappManager } from "../whatsapp/client";
import { eventBus } from "../whatsapp/events";

async function main(): Promise<void> {
  console.log("==================================================");
  console.log("🚀 WhatsRook JS - High-Performance WhatsApp Bot");
  console.log(`⚡ Runtime: Bun ${process.versions.bun ?? process.version}`);
  console.log("🧩 Engine: zapo-js (vinikjkkj/zapo)");
  console.log("==================================================");

  eventBus.on("qr", async (qrData) => {
    console.log("\n📱 Scan this QR Code to pair with WhatsApp:");
    try {
      const terminalQr = await QRCode.toString(qrData.qr, {
        type: "terminal",
        small: true,
      });
      console.log(terminalQr);
    } catch {
      console.log("Raw QR String:", qrData.qr);
    }
  });

  eventBus.on("pairing_code", ({ code, phone }) => {
    console.log(`\n🔑 Pairing code for ${phone || "device"}: [ ${code} ]`);
  });

  eventBus.on("state", ({ state, meJid }) => {
    console.log(`\n[status] Connection state changed: ${state}`);
    if (meJid) {
      console.log(`✅ Linked WhatsApp account: ${meJid}`);
    }
  });

  eventBus.on("message", (msg) => {
    const chatLabel = msg.isGroup ? `[Group ${msg.remoteJid}]` : `[DM]`;
    console.log(`${chatLabel} ${msg.sender}: ${msg.text}`);
  });

  process.on("SIGINT", async () => {
    console.log("\n🛑 Stopping WhatsApp bot...");
    await whatsappManager.disconnect();
    process.exit(0);
  });

  process.on("SIGTERM", async () => {
    console.log("\n🛑 Terminating WhatsApp bot...");
    await whatsappManager.disconnect();
    process.exit(0);
  });

  console.log("Connecting to WhatsApp Web...");
  await whatsappManager.connect();
}

void main().catch((err) => {
  console.error("Fatal startup error:", err);
  process.exit(1);
});
