/**
 * Ping command: measures response round-trip time.
 */

import { NewText } from "../builder";
import type { Command } from "../types";

export const pingCommand: Command = {
  name: "ping",
  alias: ["p", "pong", "speed"],
  description: "Check bot responsiveness and processing speed",
  category: "General",
  isPublic: true,
  handler: async (ctx) => {
    const start = performance.now();
    await ctx.react("⚡");

    const elapsed = (performance.now() - start).toFixed(2);
    const msg = NewText()
      .bold("🏓 Pong!")
      .line()
      .line()
      .bullet(`Response Latency: ${elapsed}ms`)
      .line()
      .bullet(`Runtime Engine: Bun ${process.versions.bun ?? "native"}`)
      .line()
      .bullet(`Protocol Driver: zapo-js`)
      .build();

    await ctx.reply(msg);
  },
};
