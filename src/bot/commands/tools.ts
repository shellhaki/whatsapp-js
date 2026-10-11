/**
 * Utility tools commands: help menu, text tools, math evaluator, and poll generator.
 */

import { NewText } from "../builder";
import { registry } from "../registry";
import type { Command } from "../types";

export const helpCommand: Command = {
  name: "help",
  alias: ["menu", "commands"],
  description: "Display the bot command menu and usage instructions",
  category: "General",
  isPublic: true,
  handler: async (ctx) => {
    const commands = registry.list();
    const categories = new Map<string, typeof commands>();

    for (const cmd of commands) {
      const list = categories.get(cmd.category) ?? [];
      list.push(cmd);
      categories.set(cmd.category, list);
    }

    const prefix = process.env.BOT_PREFIX || "!";
    const builder = NewText()
      .bold("📋 WhatsRook Command Menu")
      .line()
      .divider()
      .line()
      .quote(`Prefix: ${prefix} | Active Commands: ${commands.length}`)
      .line()
      .line();

    for (const [cat, cmds] of categories) {
      builder.bold(`📌 ${cat}`).line();
      for (const cmd of cmds) {
        builder.bullet(`${prefix}${cmd.name} – ${cmd.description}`).line();
      }
      builder.line();
    }

    builder.divider().line().italic("Use any command by typing the prefix followed by the name.");

    await ctx.reply(builder);
  },
};

export const echoCommand: Command = {
  name: "echo",
  alias: ["say"],
  description: "Repeat the provided text message",
  category: "Tools",
  isPublic: true,
  handler: async (ctx) => {
    if (!ctx.query) {
      await ctx.reply("Please provide text to echo. Example: !echo Hello world");
      return;
    }
    await ctx.send(ctx.query);
  },
};

export const base64Command: Command = {
  name: "base64",
  alias: ["b64"],
  description: "Encode or decode base64 strings (usage: !base64 enc <text> or !base64 dec <text>)",
  category: "Tools",
  isPublic: true,
  handler: async (ctx) => {
    const sub = ctx.args[0]?.toLowerCase();
    const text = ctx.args.slice(1).join(" ");

    if (sub === "enc" || sub === "encode") {
      const encoded = Buffer.from(text, "utf-8").toString("base64");
      await ctx.reply(NewText().bold("Encoded:").line().code(encoded));
    } else if (sub === "dec" || sub === "decode") {
      try {
        const decoded = Buffer.from(text, "base64").toString("utf-8");
        await ctx.reply(NewText().bold("Decoded:").line().code(decoded));
      } catch {
        await ctx.reply("❌ Invalid base64 input string.");
      }
    } else {
      await ctx.reply("Usage: `!base64 enc <text>` or `!base64 dec <text>`");
    }
  },
};

export const pollCommand: Command = {
  name: "poll",
  description: "Create an interactive WhatsApp poll (usage: !poll Question? | Option 1 | Option 2)",
  category: "Tools",
  isPublic: true,
  handler: async (ctx) => {
    if (!ctx.query.includes("|")) {
      await ctx.reply("Usage: `!poll What is your choice? | Option A | Option B | Option C`");
      return;
    }

    const parts = ctx.query.split("|").map((s) => s.trim()).filter(Boolean);
    const question = parts[0];
    const options = parts.slice(1);

    if (options.length < 2) {
      await ctx.reply("❌ A poll requires at least two options separated by `|`.");
      return;
    }

    await ctx.sendPoll(question, options, 1);
  },
};
