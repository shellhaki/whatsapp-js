# Contributing Guidelines

Welcome to **whatsapp-js**. These guidelines should be reviewed before submitting issues or pull requests.

## 1. Development Management

All development workflows are managed through the [Taskfile](../Taskfile.yml) or Bun scripts:

| Task        | Command          | Description                                                               |
| :---------- | :--------------- | :------------------------------------------------------------------------ |
| `install`   | `task install`   | Download and install project dependencies with `bun install`.             |
| `dev`       | `task dev`       | Start the Next.js fullstack development server on `localhost:3000`.       |
| `bot`       | `task bot`       | Run the standalone headless WhatsApp bot CLI with ANSI terminal QR.       |
| `typecheck` | `task typecheck` | Run static TypeScript validation (`tsc --noEmit`).                        |
| `lint`      | `task lint`      | Lint the codebase with ESLint.                                            |
| `build`     | `task build`     | Compile Next.js and server assets for production.                         |
| `clean`     | `task clean`     | Remove build artifacts, `.next`, and temporary test sessions.             |

## 2. Architecture & Code Quality

- **AI Agents**: If you are an AI assistant, read [AGENTS](../AGENTS.md) carefully before making modifications.
- **Protocol Library**: All WhatsApp protocol logic must use [`zapo-js`](https://github.com/vinikjkkj/zapo) and `@zapo-js/store-sqlite`. Do not introduce deprecated or incompatible libraries.
- **Strict Types**: Every module, interface, and handler must have comprehensive TypeScript type definitions. Do not use unchecked `any`.
- **Formatting**: Code must adhere to strict formatting and pass `task lint` & `task typecheck` before creating PRs.
- **Commits**: Conventional commit conventions must be followed (`feat:`, `fix:`, `refactor:`, `docs:`, `test:`).

## 3. Pull Request Workflow

1. Fork and create a feature branch from `main`.
2. Implement your changes following project conventions.
3. Validate locally with `task typecheck`, `task lint`, and `task build`.
4. Submit a Pull Request targeting the `main` branch.
