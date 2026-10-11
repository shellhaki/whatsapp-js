# Claude Code & AI Agent Instructions

The contributor handbook and architectural guide for this repository lives in:
[`AGENTS.md`](./AGENTS.md)

Read `AGENTS.md` and follow it as your primary source of project conventions, architecture rules, performance constraints, and `zapo-js` implementation patterns.

## Framework Documentation

For Next.js 16 conventions and App Router rules, consult the local versioned documentation:
`node_modules/next/dist/docs/`

## Key Commands

- `bun install`: Install dependencies
- `bun run dev`: Start Next.js fullstack dev server (Web UI + API + WhatsApp client)
- `bun run bot`: Run headless CLI WhatsApp bot with terminal QR
- `bun run build`: Build Next.js application
- `bun run typecheck`: Run TypeScript compiler checks (`tsc --noEmit`)
- `bun run lint`: Run ESLint validation
- `task <command>`: Task automation via [`Taskfile.yml`](./Taskfile.yml)
