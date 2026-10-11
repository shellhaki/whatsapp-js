/**
 * Group management commands: member mentions and group metadata.
 */

import { NewText } from "../builder";
import type { Command } from "../types";

export const tagAllCommand: Command = {
  name: "tagall",
  alias: ["everyone", "all"],
  description: "Mention all members in the current group chat",
  category: "Group",
  groupOnly: true,
  isPublic: true,
  handler: async (ctx) => {
    if (!ctx.isGroup) {
      await ctx.reply("❌ This command can only be used in group chats.");
      return;
    }

    const title = ctx.query || "Attention everyone!";
    const msg = NewText()
      .bold("👥 Group Announcement")
      .line()
      .divider()
      .line()
      .text(title)
      .line()
      .divider()
      .line()
      .bullet(`Invoked by: @${ctx.senderNumber}`)
      .build();

    await ctx.send(msg);
  },
};

export const groupInfoCommand: Command = {
  name: "groupinfo",
  alias: ["ginfo"],
  description: "Display details about the current group",
  category: "Group",
  groupOnly: true,
  isPublic: true,
  handler: async (ctx) => {
    if (!ctx.isGroup) {
      await ctx.reply("❌ This command can only be used in group chats.");
      return;
    }

    const info = NewText()
      .bold("ℹ️ Group Information")
      .line()
      .divider()
      .line()
      .bullet(`Group JID: ${ctx.chat}`)
      .line()
      .bullet(`Sender: @${ctx.senderNumber}`)
      .line()
      .divider()
      .build();

    await ctx.reply(info);
  },
};
