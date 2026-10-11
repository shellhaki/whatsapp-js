/**
 * Owner-restricted commands: bot administration, runtime evaluation, and control.
 */

import { NewText } from "../builder";
import type { Command } from "../types";

export const evalCommand: Command = {
  name: "eval",
  description: "Execute runtime JavaScript code expression (Owner only)",
  category: "Owner",
  isPublic: false,
  handler: async (ctx) => {
    if (!ctx.isOwner) {
      await ctx.reply("⛔ This command is restricted to the bot owner.");
      return;
    }

    if (!ctx.query) {
      await ctx.reply("Provide a JavaScript expression to evaluate.");
      return;
    }

    try {
      // Evaluate within a safe scope
      const fn = new Function("ctx", `return (${ctx.query});`);
      const result = await Promise.resolve(fn(ctx));
      const serialized = typeof result === "object" ? JSON.stringify(result, null, 2) : String(result);

      await ctx.reply(
        NewText()
          .bold("💻 Eval Output:")
          .line()
          .codeBlock(serialized || "undefined", "json")
          .build()
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      await ctx.reply(NewText().bold("❌ Eval Error:").line().code(msg).build());
    }
  },
};

export const broadcastCommand: Command = {
  name: "broadcast",
  alias: ["bc"],
  description: "Broadcast an announcement message (Owner only)",
  category: "Owner",
  isPublic: false,
  handler: async (ctx) => {
    if (!ctx.isOwner) {
      await ctx.reply("⛔ This command is restricted to the bot owner.");
      return;
    }

    if (!ctx.query) {
      await ctx.reply("Usage: `!broadcast <message>`");
      return;
    }

    const ann = NewText()
      .bold("📢 Official Broadcast")
      .line()
      .divider()
      .line()
      .text(ctx.query)
      .line()
      .divider()
      .build();

    await ctx.send(ann);
  },
};
