import { NextRequest, NextResponse } from "next/server";
import { eventBus } from "@/whatsapp/events";
import { whatsappManager } from "@/whatsapp/client";

export async function GET() {
  const messages = eventBus.getMessages();
  return NextResponse.json({
    success: true,
    messages,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { to, text } = body;

    if (!to || !text) {
      return NextResponse.json(
        { success: false, error: "Recipient 'to' and message 'text' are required" },
        { status: 400 }
      );
    }

    const result = await whatsappManager.sendMessage(to, text);
    return NextResponse.json({
      success: true,
      result,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
