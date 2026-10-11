<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS & CONTRIBUTOR GUIDELINES

If you are an AI reading this, take every single word in this file literally. This project is a high-performance WhatsApp bot and web platform built with **Bun**, **TypeScript**, **Next.js (App Router)**, and **`zapo-js`**.

## 1. Project Principles & Architecture

All code here adheres to a deliberate structure designed for high reliability, minimal resource footprint, and type safety:

- **Library First (`zapo-js`)**: Never invent protocols, fabricate fake Baileys/WPPConnect APIs, or rely on outdated training data. Always adhere strictly to `zapo-js` and `@zapo-js/store-sqlite` contracts.
- **Fluent Builder Pattern**: For message composition, use the fluent builder pattern (`TextBuilder`, `Bold`, `Italic`, `CodeBlock`, etc.) inspired by `whatsrook` in `whatsapp-go`.
- **Command Dispatcher Pipeline**: Commands are registered in a synchronized registry (`Command` interface with `name`, `alias`, `category`, `description`, `isPublic`, `groupOnly`, and async `handler`).
- **Next.js Fullstack Architecture**:
  - Web UI uses React 19 and Next.js App Router (`src/app/page.tsx`, `src/app/layout.tsx`).
  - REST & SSE Endpoints live in `src/app/api/` (e.g. `/api/auth/qr`, `/api/auth/status`, `/api/events`, `/api/messages`).
  - Next.js server lifecycle integration uses `src/instrumentation.ts` (`register()` hook).
- **Dual Execution Modes**:
  - `bun run dev`: Launches Next.js fullstack dashboard with embedded WhatsApp engine and live SSE events.
  - `bun run bot`: Launches headless CLI bot with ANSI terminal QR code output and interactive commands.

## 2. Directory Structure

```text
whatsapp-js/
├── src/
│   ├── app/                 # Next.js App Router (Dashboard & API endpoints)
│   │   ├── api/             # API Route Handlers (auth, events, messages, commands)
│   │   ├── layout.tsx       # Root layout with dark mode
│   │   └── page.tsx         # Modern interactive WhatsApp dashboard
│   ├── bot/                 # Core Bot Engine
│   │   ├── builder.ts       # Fluent TextBuilder & formatting helpers
│   │   ├── context.ts       # PluginContext (scoped send, reply, react, permissions)
│   │   ├── dispatch.ts      # Message router & command dispatcher
│   │   ├── registry.ts      # In-memory command registry
│   │   ├── types.ts         # TypeScript interfaces & types
│   │   ├── cli.ts           # Standalone terminal bot runner
│   │   └── commands/        # Modular command implementations
│   ├── whatsapp/            # zapo-js connection & state layer
│   │   ├── client.ts        # WaClient singleton & lifecycle manager
│   │   ├── store.ts         # SQLite persistent store initialization
│   │   ├── events.ts        # Typed event bus for SSE & UI streaming
│   │   └── helpers.ts       # JID utilities & message text extractors
│   └── instrumentation.ts   # Next.js server startup hook
├── docs/                    # Architectural & onboarding documentation
├── Taskfile.yml             # Task automation configuration
└── README.md                # Comprehensive project documentation
```

## 3. Workflow & Tasks

Use [`Taskfile.yml`](./Taskfile.yml) for repository operations:
- `task install` – Install Bun dependencies.
- `task dev` – Start Next.js development server.
- `task bot` – Run standalone CLI bot.
- `task build` – Compile production bundle.
- `task typecheck` – Run TypeScript type checking.
- `task lint` – Run ESLint checks.
