/**
 * Command routing and execution pipeline.
 *
 * Intercepts incoming messages, evaluates active prefixes, enforces authorization
 * and group scopes, and executes matching command handlers.
 */

import type { WaClient } from "zapo-js";
import { PluginContext, type IncomingEventMeta } from "./context";
import { registry } from "./registry";
import { NewText } from "./builder";

/**
 * Evaluates an incoming message event against registered commands.
 *
 * @param client - The active WaClient instance.
 * @param event - The incoming message event metadata.
 * @param body - The extracted text body of the message.
 * @returns true if handled by a command, false otherwise.
 */
export async function dispatch(
  client: WaClient,
  event: IncomingEventMeta,
  body: string
): Promise<boolean> {
  const prefix = process.env.BOT_PREFIX || "!";
  const trimmed = body.trim();

  // Verify prefix match
  if (!trimmed.startsWith(prefix)) {
    return false;
  }

  const withoutPrefix = trimmed.slice(prefix.length).trim();
  if (!withoutPrefix) {
    return false;
  }

  const parts = withoutPrefix.split(/\s+/);
  const commandName = parts[0]?.toLowerCase();
  const args = parts.slice(1);

  if (!commandName) {
    return false;
  }

  const cmd = registry.get(commandName);
  if (!cmd) {
    return false;
  }

  const ctx = new PluginContext(client, event, body, commandName, args);

  // Group check
  if (cmd.groupOnly && !ctx.isGroup) {
    await ctx.reply("❌ This command can only be used inside group chats.");
    return true;
  }

  // Owner / Public authorization check
  if (cmd.isPublic === false && !ctx.isOwner) {
    await ctx.reply("⛔ This command is restricted to the bot owner.");
    return true;
  }

  try {
    await cmd.handler(ctx);
  } catch (err) {
    console.error(`[bot] Error executing command '${commandName}':`, err);
    const errMessage = err instanceof Error ? err.message : String(err);
    const feedback = NewText()
      .bold("⚠️ Command Execution Failed")
      .line()
      .bullet(`Command: ${commandName}`)
      .line()
      .bullet(`Error: ${errMessage}`)
      .build();

    await ctx.reply(feedback).catch(() => undefined);
  }

  return true;
}
