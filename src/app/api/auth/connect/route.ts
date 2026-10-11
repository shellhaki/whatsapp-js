import { NextResponse } from "next/server";
import { whatsappManager } from "@/whatsapp/client";

export async function POST() {
  try {
    void whatsappManager.connect();
    return NextResponse.json({ success: true, message: "Connection initiated" });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
