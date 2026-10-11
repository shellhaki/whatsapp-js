/**
 * Execution context provided to bot command handlers.
 *
 * Encapsulates the runtime WhatsApp client, the incoming event metadata,
 * argument parsing, and ergonomic response helpers (reply, react, poll).
 */

import type { WaClient } from "zapo-js";
import type { TextBuilder } from "./builder";
import { formatJidToPhone, isGroupJid } from "../whatsapp/helpers";

export interface IncomingEventMeta {
  key: {
    remoteJid?: string | null;
    fromMe?: boolean | null;
    id?: string | null;
    participant?: string | null;
  };
  pushName?: string | null;
  timestampSeconds?: number;
}

export class PluginContext {
  public readonly client: WaClient;
  public readonly event: IncomingEventMeta;
  public readonly from: string;
  public readonly chat: string;
  public readonly sender: string;
  public readonly senderNumber: string;
  public readonly isGroup: boolean;
  public readonly isFromMe: boolean;
  public readonly isOwner: boolean;
  public readonly command: string;
  public readonly args: string[];
  public readonly query: string;
  public readonly body: string;

  constructor(
    client: WaClient,
    event: IncomingEventMeta,
    body: string,
    command: string,
    args: string[]
  ) {
    this.client = client;
    this.event = event;
    this.body = body;
    this.command = command;
    this.args = args;
    this.query = args.join(" ").trim();

    this.chat = event.key.remoteJid ?? "";
    this.isGroup = isGroupJid(this.chat);
    this.isFromMe = Boolean(event.key.fromMe);

    // In groups, participant is the actual sender
    const rawSender = this.isGroup ? event.key.participant ?? this.chat : this.chat;
    this.from = rawSender;
    this.sender = rawSender;
    this.senderNumber = formatJidToPhone(rawSender);

    const ownerEnv = process.env.OWNER_NUMBER?.trim().replace(/\D/g, "");
    this.isOwner =
      this.isFromMe || (Boolean(ownerEnv) && this.senderNumber.includes(ownerEnv!));
  }

  /**
   * Replies directly to the incoming message quoting it.
   */
  public async reply(content: string | TextBuilder): Promise<unknown> {
    const text = typeof content === "string" ? content : content.build();
    return this.client.message.send(
      this.chat,
      {
        type: "text",
        text,
        contextInfo: {
          quotedMessageId: this.event.key.id ?? undefined,
          quotedParticipant: this.event.key.participant ?? undefined,
          quotedRemoteJid: this.chat,
        },
      },
      {
        quote: {
          id: this.event.key.id ?? "",
          participant: this.event.key.participant ?? undefined,
          remoteJid: this.chat,
          fromMe: this.isFromMe,
        },
      }
    );
  }

  /**
   * Sends a message to the current chat without quoting.
   */
  public async send(content: string | TextBuilder): Promise<unknown> {
    const text = typeof content === "string" ? content : content.build();
    return this.client.message.send(this.chat, text);
  }

  /**
   * Reacts with an emoji to the incoming message.
   */
  public async react(emoji: string): Promise<unknown> {
    return this.client.message.send(this.chat, {
      type: "reaction",
      emoji,
      target: {
        remoteJid: this.chat,
        fromMe: this.isFromMe,
        id: this.event.key.id ?? "",
        participant: this.event.key.participant ?? undefined,
      },
    });
  }

  /**
   * Sends an interactive WhatsApp poll.
   */
  public async sendPoll(
    name: string,
    options: string[],
    selectableCount = 1
  ): Promise<unknown> {
    return this.client.message.send(this.chat, {
      type: "poll",
      name,
      options,
      selectableCount,
    });
  }
}
