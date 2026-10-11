import { NextResponse } from "next/server";
import { registry } from "@/bot/registry";
import { registerDefaultCommands } from "@/bot/commands";

export async function GET() {
  if (registry.count() === 0) {
    registerDefaultCommands();
  }

  const commands = registry.list();
  return NextResponse.json({
    success: true,
    total: commands.length,
    commands,
  });
}
