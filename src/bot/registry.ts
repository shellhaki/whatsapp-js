/**
 * Synchronized in-memory command registry.
 */

import type { Command, CommandInfo } from "./types";

class CommandRegistry {
  private readonly commands = new Map<string, Command>();
  private readonly aliases = new Map<string, string>();

  /**
   * Registers a command with its aliases.
   */
  public register(command: Command): void {
    const primaryName = command.name.toLowerCase().trim();
    this.commands.set(primaryName, command);

    if (command.alias) {
      for (const a of command.alias) {
        const aliasName = a.toLowerCase().trim();
        this.aliases.set(aliasName, primaryName);
      }
    }
  }

  /**
   * Resolves a command by trigger name or alias.
   */
  public get(name: string): Command | undefined {
    const normalized = name.toLowerCase().trim();
    const primary = this.aliases.get(normalized) ?? normalized;
    return this.commands.get(primary);
  }

  /**
   * Lists all unique registered commands.
   */
  public list(): CommandInfo[] {
    const list: CommandInfo[] = [];
    for (const cmd of this.commands.values()) {
      list.push({
        name: cmd.name,
        alias: cmd.alias,
        description: cmd.description,
        category: cmd.category,
        isPublic: cmd.isPublic !== false,
        groupOnly: Boolean(cmd.groupOnly),
      });
    }
    return list;
  }

  /**
   * Returns the count of registered commands.
   */
  public count(): number {
    return this.commands.size;
  }
}

export const registry = new CommandRegistry();
