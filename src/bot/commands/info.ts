/**
 * Info command: displays bot system status, runtime statistics, and version.
 */

import os from "node:os";
import { NewText } from "../builder";
import type { Command } from "../types";

function formatUptime(seconds: number): string {
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const parts: string[] = [];
  if (d > 0) parts.push(`${d}d`);
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  parts.push(`${s}s`);
  return parts.join(" ");
}

function formatBytes(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

export const infoCommand: Command = {
  name: "info",
  alias: ["status", "system", "botinfo"],
  description: "Display bot runtime environment and system performance statistics",
  category: "General",
  isPublic: true,
  handler: async (ctx) => {
    const memUsage = process.memoryUsage();
    const uptimeStr = formatUptime(process.uptime());

    const msg = NewText()
      .bold("🤖 WhatsRook JS Status")
      .line()
      .divider()
      .line()
      .bullet(`Platform: ${os.type()} ${os.arch()}`)
      .line()
      .bullet(`Runtime: Bun ${process.versions.bun ?? process.version}`)
      .line()
      .bullet(`WhatsApp Engine: zapo-js v1.10.0`)
      .line()
      .bullet(`Process Uptime: ${uptimeStr}`)
      .line()
      .bullet(`RSS Memory: ${formatBytes(memUsage.rss)}`)
      .line()
      .bullet(`Heap Used: ${formatBytes(memUsage.heapUsed)}`)
      .line()
      .bullet(`Sender: ${ctx.senderNumber}`)
      .line()
      .divider()
      .line()
      .quote("Built for extreme performance, zero-copy hot paths & low memory.")
      .build();

    await ctx.reply(msg);
  },
};
