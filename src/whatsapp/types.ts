/**
 * WhatsApp state and event types for the zapo-js integration layer.
 */

export type ConnectionState = "disconnected" | "connecting" | "open" | "close";

export interface SessionInfo {
  sessionId: string;
  state: ConnectionState;
  meJid?: string;
  phone?: string;
  pushName?: string;
  platform?: string;
  uptimeSeconds: number;
}

export interface QrData {
  qr: string;
  qrDataUrl?: string;
  ttlMs?: number;
  generatedAt: number;
}

export interface PairingCodeData {
  code: string;
  phone: string;
  generatedAt: number;
}

export interface LiveMessageEvent {
  id: string;
  remoteJid: string;
  sender: string;
  fromMe: boolean;
  text: string;
  timestamp: number;
  isGroup: boolean;
  pushName?: string;
}

export interface SendMessagePayload {
  to: string;
  text: string;
  quotedId?: string;
}
