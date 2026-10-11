/**
 * Bot command registry and pipeline type definitions.
 */

import type { PluginContext } from "./context";

export type CommandHandler = (ctx: PluginContext) => Promise<void> | void;

export interface Command {
  /** Primary trigger word for the command (e.g. "ping"). */
  name: string;
  /** Secondary trigger aliases (e.g. ["p", "pong"]). */
  alias?: string[];
  /** Concise explanation of command purpose and usage. */
  description: string;
  /** Logical category (e.g. "General", "Tools", "Owner", "Group", "AI"). */
  category: string;
  /** Whether the command is accessible to non-owners (default: true). */
  isPublic?: boolean;
  /** Whether execution is restricted to group chats (default: false). */
  groupOnly?: boolean;
  /** Execution handler. */
  handler: CommandHandler;
}

export interface CommandInfo {
  name: string;
  alias?: string[];
  description: string;
  category: string;
  isPublic: boolean;
  groupOnly: boolean;
}
