/**
 * Next.js Instrumentation Lifecycle Hook.
 *
 * Runs once upon Next.js server initialization to bootstrap the background
 * WhatsApp client connection.
 */

export async function register(): Promise<void> {
  // Ensure this only runs on the Node.js / Bun server runtime, not edge
  if (process.env.NEXT_RUNTIME === "nodejs") {
    console.log("[instrumentation] Bootstrapping WhatsRook WhatsApp client service...");
    const { whatsappManager } = await import("./whatsapp/client");
    void whatsappManager.connect().catch((err) => {
      console.warn("[instrumentation] Background WhatsApp connection start:", err);
    });
  }
}
