/**
 * Command registration barrel file.
 */

import { registry } from "../registry";
import { pingCommand } from "./ping";
import { infoCommand } from "./info";
import { helpCommand, echoCommand, base64Command, pollCommand } from "./tools";
import { aiCommand } from "./ai";
import { evalCommand, broadcastCommand } from "./owner";
import { tagAllCommand, groupInfoCommand } from "./group";

export function registerDefaultCommands(): void {
  registry.register(pingCommand);
  registry.register(infoCommand);
  registry.register(helpCommand);
  registry.register(echoCommand);
  registry.register(base64Command);
  registry.register(pollCommand);
  registry.register(aiCommand);
  registry.register(evalCommand);
  registry.register(broadcastCommand);
  registry.register(tagAllCommand);
  registry.register(groupInfoCommand);
}
