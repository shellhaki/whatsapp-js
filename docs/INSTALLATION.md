# Installation Guide

This guide covers installing and configuring **whatsapp-js** on Linux, macOS, and Windows with Bun.

## Prerequisites

- [Bun](https://bun.sh/) (version 1.1 or higher)
- WhatsApp on your smartphone (for QR code or pairing code verification)

## 1. Clone the Repository

```bash
git clone https://github.com/thruqe/whatsapp-js.git
cd whatsapp-js
```

## 2. Install Dependencies

Install all dependencies using Bun:

```bash
bun install
```

## 3. Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Configure your `.env` options:
- `SESSION_ID`: Identifier for the session instance (default: `default`).
- `PORT`: HTTP port for Next.js (default: `3000`).
- `BOT_PREFIX`: Prefix character for bot triggers (default: `!`).
- `OWNER_NUMBER`: WhatsApp phone number of the bot owner (e.g. `2348012345678`).

## 4. Running the Application

### Option A: Next.js Web Dashboard & Bot (Recommended)

Start the Next.js server with live dashboard, REST API, and WhatsApp client:

```bash
bun run dev
```

Navigate to `http://localhost:3000` to view the dashboard and scan the QR code.

### Option B: Headless Terminal Bot CLI

Run the headless WhatsApp bot directly in your terminal:

```bash
bun run bot
```

The terminal will render an ANSI QR code for direct pairing.
