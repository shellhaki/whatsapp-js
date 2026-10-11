/**
 * JID parsing, text extraction, and message normalization helpers.
 */

import type { proto } from "zapo-js";

/**
 * Extracts plain-text content from any WhatsApp message structure.
 *
 * @param message - The raw protobuf IMessage payload.
 * @returns The extracted string or undefined.
 */
export function extractIncomingText(
  message: proto.IMessage | null | undefined
): string | undefined {
  if (!message) return undefined;

  if (typeof message.conversation === "string" && message.conversation.length > 0) {
    return message.conversation;
  }

  const extendedText = message.extendedTextMessage?.text;
  if (typeof extendedText === "string" && extendedText.length > 0) {
    return extendedText;
  }

  const imageCaption = message.imageMessage?.caption;
  if (typeof imageCaption === "string" && imageCaption.length > 0) {
    return imageCaption;
  }

  const videoCaption = message.videoMessage?.caption;
  if (typeof videoCaption === "string" && videoCaption.length > 0) {
    return videoCaption;
  }

  const documentCaption = message.documentMessage?.caption;
  if (typeof documentCaption === "string" && documentCaption.length > 0) {
    return documentCaption;
  }

  return undefined;
}

/**
 * Determines whether a given JID represents a WhatsApp group chat.
 */
export function isGroupJid(jid: string): boolean {
  return jid.endsWith("@g.us");
}

/**
 * Determines whether a given JID represents a newsletter / channel.
 */
export function isNewsletterJid(jid: string): boolean {
  return jid.endsWith("@newsletter");
}

/**
 * Formats a JID into a human-readable phone number or group ID.
 */
export function formatJidToPhone(jid: string): string {
  const [user] = jid.split("@");
  return user || jid;
}

/**
 * Normalizes a recipient target string into a fully qualified WhatsApp JID.
 */
export function normalizeTargetJid(target: string): string {
  const cleaned = target.trim();
  if (cleaned.includes("@")) {
    return cleaned;
  }
  const digitsOnly = cleaned.replace(/\D/g, "");
  return `${digitsOnly}@s.whatsapp.net`;
}
