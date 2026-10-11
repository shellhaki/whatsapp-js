import { NextResponse } from "next/server";
import { eventBus } from "@/whatsapp/events";

export async function GET() {
  const qr = eventBus.getQr();
  if (!qr) {
    return NextResponse.json({
      success: false,
      message: "No active QR code available",
    });
  }

  return NextResponse.json({
    success: true,
    ...qr,
  });
}
