import { NextRequest, NextResponse } from "next/server";
import { whatsappManager } from "@/whatsapp/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const phone = body.phone;

    if (!phone || typeof phone !== "string") {
      return NextResponse.json(
        { success: false, error: "Phone number is required" },
        { status: 400 }
      );
    }

    const code = await whatsappManager.requestPairingCode(phone);
    return NextResponse.json({
      success: true,
      phone,
      code,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
