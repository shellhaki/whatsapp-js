<p align="center">
  <img src="https://pub-687f7ee583cf4f339cab34d2b3a3871d.r2.dev/logo.svg" width="220" alt="WhatsRook JS" />
</p>

<h1 align="center">WhatsRook JS</h1>

<p align="center">
  <strong>High-performance, lightweight WhatsApp automation bot and control center.</strong><br />
  Engineered with Bun, TypeScript, Next.js (App Router), and <a href="https://github.com/vinikjkkj/zapo">zapo-js</a>.
</p>

<p align="center">
  <img alt="runtime" src="https://img.shields.io/badge/runtime-Bun-FBF0DF?logo=bun&logoColor=black" />
  <img alt="language" src="https://img.shields.io/badge/language-TypeScript-3178C6?logo=typescript&logoColor=white" />
  <img alt="framework" src="https://img.shields.io/badge/framework-Next.js%2016-black?logo=next.js&logoColor=white" />
  <img alt="protocol" src="https://img.shields.io/badge/protocol-zapo--js-0A7EA4" />
  <img alt="license" src="https://img.shields.io/badge/license-MIT-green" />
</p>

---

## Overview

**WhatsRook JS** is an automation bot and real-time management dashboard that integrates with your WhatsApp linked devices. Built for zero-copy hot paths, low memory consumption, and high concurrency on the Bun runtime.

It features both a **Next.js Fullstack Dashboard** with real-time Server-Sent Events (SSE) and an autonomous **Headless Terminal Bot CLI** with ANSI QR rendering.

## Quick Start

### 1. Installation

```bash
bun install
```

### 2. Configuration

Create your local `.env` from the provided template:

```bash
cp .env.example .env
```

| Variable       | Description                                              | Default    |
| :------------- | :------------------------------------------------------- | :--------- |
| `SESSION_ID`   | Unique identifier for SQLite session storage             | `default`  |
| `AUTH_DIR`     | Storage directory for authentication state               | `.auth`    |
| `BOT_PREFIX`   | Command prefix trigger                                   | `!`        |
| `BOT_NAME`     | Name of the bot instance                                 | `WhatsRook`|
| `OWNER_NUMBER` | Whitelisted owner phone number (e.g. `2348012345678`)    | (empty)    |
| `PORT`         | Port for Next.js web application                         | `3000`     |

### 3. Running

#### Option A: Fullstack Web Dashboard & WhatsApp Bot

```bash
bun run dev
# or: task dev
```

Open `http://localhost:3000` to access the live dashboard, scan your QR code or generate an 8-digit phone pairing code, monitor incoming messages in real-time, and execute commands.

#### Option B: Standalone Headless CLI Bot

```bash
bun run bot
# or: task bot
```

Renders an ANSI QR code directly in your terminal for immediate pairing.

---

## Features

- **Protocol Engine**: Built strictly on [`zapo-js`](https://github.com/vinikjkkj/zapo) with `@zapo-js/store-sqlite` for secure, persistent authentication state.
- **Fluent Message Builder**: Chainable `TextBuilder` formatting API (`Bold`, `Italic`, `Code`, `CodeBlock`, `Quote`, `Divider`).
- **Command Dispatcher**: Synchronized in-memory command registry supporting aliases, permission scopes (owner, public), and chat filters (group only).
- **Interactive Web Dashboard**:
  - Live QR code pairing with automatic SSE stream updates.
  - Link with Phone Number (8-digit pairing code).
  - Real-time incoming & outgoing chat console with live streaming.
  - Interactive message composer with WhatsApp markdown helpers.
  - Bot command palette and execution test bench.
- **Server Instrumentation**: Next.js server lifecycle integration via `src/instrumentation.ts`.
- **Low Memory & Low CPU**: Zero bloated runtime wrappers; uses native Bun primitives.

---

## Bot Commands

| Command      | Aliases               | Category  | Access | Description                                           |
| :----------- | :-------------------- | :-------- | :----- | :---------------------------------------------------- |
| `!ping`      | `!p`, `!pong`         | General   | Public | Measure round-trip execution latency and status       |
| `!info`      | `!status`, `!system`  | General   | Public | View memory footprint, Bun version, and engine info  |
| `!help`      | `!menu`, `!commands`  | General   | Public | Display full command list and syntax                  |
| `!echo`      | `!say`                | Tools     | Public | Echo text back to chat                                |
| `!base64`    | `!b64`                | Tools     | Public | Base64 encoder and decoder                            |
| `!poll`      | -                     | Tools     | Public | Create interactive WhatsApp poll                      |
| `!ai`        | `!ask`, `!gpt`        | AI        | Public | Intelligent conversational assistant                  |
| `!tagall`    | `!everyone`, `!all`   | Group     | Group  | Mention all group chat participants                  |
| `!groupinfo` | `!ginfo`              | Group     | Group  | View group chat identifiers                           |
| `!eval`      | -                     | Owner     | Owner  | Evaluate JavaScript expressions at runtime            |
| `!broadcast` | `!bc`                 | Owner     | Owner  | Broadcast announcements to chats                      |

---

## Development & Automation

Managed via [Taskfile.yml](./Taskfile.yml):

```bash
task install   # Install dependencies
task dev       # Run Next.js dashboard
task bot       # Run CLI bot
task typecheck # TypeScript static type checking
task lint      # Run ESLint
task build     # Compile Next.js production build
task clean     # Clean cache and build artifacts
```

---

## Contributions

Contributions are welcome! Please read the [Contributing Guidelines](./docs/CONTRIBUTING.md).

If you are using an AI agent for development, consult the [AGENTS Documentation](./AGENTS.md) and [CLAUDE Guidelines](./CLAUDE.md).

---

## Acknowledgements

Special thanks to:
- [`vinikjkkj/zapo`](https://github.com/vinikjkkj/zapo) – The high-performance WhatsApp Web protocol TypeScript library.
- [`whatsrook`](https://github.com/thruqe/whatsapp-go) – The Go automation architecture inspiration.

---

## Licensing

Licensed under the [MIT License](./LICENSE).

---

## Support this project

If you found this project helpful, please consider sending a tip:

<a href="https://etherscan.io/address/0x76a5307e573401f2b7189fb721a33dc483e985a8"><img src="https://cdn-icons-png.flaticon.com/128/15301/15301597.png" width="24" height="24" alt="Donate ETH" /></a> `0x76a5307e573401f2b7189fb721a33dc483e985a8`
