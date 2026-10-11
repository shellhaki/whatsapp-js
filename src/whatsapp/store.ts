/**
 * SQLite store management for persistent WhatsApp sessions.
 */

import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { createStore } from "zapo-js";
import { createSqliteStore } from "@zapo-js/store-sqlite";

/**
 * Creates a persistent SQLite store backed by `@zapo-js/store-sqlite`.
 *
 * @param sessionPath - File path to the SQLite database.
 * @returns Configured zapo store instance.
 */
export function initializeSessionStore(sessionPath?: string) {
  const defaultPath = resolve(process.cwd(), process.env.AUTH_DIR || ".auth", "state.sqlite");
  const targetPath = sessionPath ?? defaultPath;

  mkdirSync(dirname(targetPath), { recursive: true });

  const sqliteBackend = createSqliteStore({
    path: targetPath,
    driver: "auto",
  });

  return createStore({
    backends: {
      sqlite: sqliteBackend,
    },
    providers: {
      auth: "sqlite",
      signal: "sqlite",
      preKey: "sqlite",
      session: "sqlite",
      identity: "sqlite",
      senderKey: "sqlite",
      appState: "sqlite",
      privacyToken: "sqlite",
      messages: "sqlite",
      threads: "sqlite",
      contacts: "sqlite",
    },
  });
}
