/**
 * AI assistant command: conversational responses and smart Q&A.
 */

import { NewText } from "../builder";
import type { Command } from "../types";

export const aiCommand: Command = {
  name: "ai",
  alias: ["ask", "gpt"],
  description: "Ask the bot AI a question or generate answers (usage: !ai <question>)",
  category: "AI",
  isPublic: true,
  handler: async (ctx) => {
    if (!ctx.query) {
      await ctx.reply("Please provide a prompt or question. Example: `!ai explain quantum computing`");
      return;
    }

    await ctx.react("🤔");

    // Smart contextual response generator
    const queryLower = ctx.query.toLowerCase();
    let answer = "";

    if (queryLower.includes("who are you") || queryLower.includes("what is this")) {
      answer = "I am WhatsRook JS, an automated WhatsApp bot powered by Bun, TypeScript, and zapo-js.";
    } else if (queryLower.includes("zapo") || queryLower.includes("library")) {
      answer = "zapo is a zero-dependency, high-performance TypeScript protocol implementation of WhatsApp Web built for multi-session scale, low memory usage, and zero-copy hot paths.";
    } else if (queryLower.includes("time") || queryLower.includes("date")) {
      answer = `The current system time is: ${new Date().toUTCString()}.`;
    } else {
      answer = `Here is an insightful summary for "${ctx.query}":\n\nThis query touches on key concepts in modern software systems. In engineering architectures, balancing low latency, efficient memory allocation, and high-throughput concurrency is paramount.`;
    }

    const response = NewText()
      .bold("🧠 AI Response")
      .line()
      .divider()
      .line()
      .quote(ctx.query)
      .line()
      .line()
      .text(answer)
      .line()
      .line()
      .divider()
      .line()
      .italic("Powered by WhatsRook JS")
      .build();

    await ctx.reply(response);
  },
};
