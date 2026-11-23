# Getting started

Install `@protohq/cli` in a React 19 + Vite 8 application to run the full local prototype gallery and review loop on your machine — free forever, including for commercial projects.

## Prerequisites

- **React 19** and **Vite 8** installed in the target app. Proto compiles prototypes with your app's own Vite config and React installation.
- **Node.js 22+** or **Bun** to run the `proto` CLI.
- A free Proto account for interactive local commands (`proto dev`, `proto start`, `proto init`, `proto mcp`). Sign in with Google, GitHub, or an email link through `proto login`. CI environments (`CI=1`) and headless commands (`proto check`, `proto build`, `proto status`, `proto stop`, `proto migrate`) do not require login.

## Install and initialize

Run these commands inside your app directory (or pass `--app <dir>` from a monorepo root):

```sh
bun add -d @protohq/cli
bunx proto login
bunx proto init --skills
bunx proto dev --open
```

`proto init` scaffolds five pieces without altering your production app:

- `proto.config.ts` — gallery title, specs, roles, and build/network guards.
- `proto.canvas.tsx` — exports `Canvas` (providers and app CSS) and optional `Frame` chrome.
- `src/drafts/welcome/index.proto.tsx` — a starter draft you can open immediately.
- `proto()` added to your `vite.config.ts` plugins array so prototype code can never leak into your production bundle.
- `--skills` installs the `proto` and `proto-apply-comments` skills into `.agents/skills/` at the repository root.

Optional peer dependencies are only needed if you use those specific features:

| Feature                              | Optional peer                           | Setup                                                           |
| ------------------------------------ | --------------------------------------- | --------------------------------------------------------------- |
| Screenshots and HTML evidence        | `playwright` (`^1.64.0`)                | `bun add -d playwright` then `bunx playwright install chromium` |
| Local stdio MCP server (`proto mcp`) | `@modelcontextprotocol/sdk` (`^1.32.2`) | `bun add -d @modelcontextprotocol/sdk`                          |

## Write your first component prototype

Place a `*.proto.tsx` file next to the production view it renders. Export a static `meta` object via `definePrototype` and a default React component that passes fixture props:

```tsx
// src/components/stay-checkout.proto.tsx
import { definePrototype, setParam, type PrototypeProps } from "@protohq/cli";
import { StayCheckout } from "./stay-checkout";

export const meta = definePrototype({
  title: "Stay checkout",
  spec: "booking",
  surface: "B1",
  route: "/stays/casa-mare/checkout",
  states: [
    { id: "ready", label: "Ready" },
    { id: "card-error", label: "Card declined" },
    { id: "confirmed", label: "Confirmed" },
  ],
});

export default function Prototype({ state }: PrototypeProps) {
  return (
    <StayCheckout
      status={state === "card-error" ? "error" : state === "confirmed" ? "confirmed" : "ready"}
      onSubmit={() => setParam("state", "confirmed")}
    />
  );
}
```

Save the file and the gallery updates immediately at `http://127.0.0.1:4400/p/<label>/`.

## Verify with `proto check`

Run `proto check` locally or in CI before building:

```sh
bunx proto check
```

`proto check` validates every prototype's static `meta`, verifies every flow target and edge, and enforces `guards.forbidRuntimeImports` so prototypes stay pure presentation views without hitting live backends.

## Next steps

- Follow the [review loop tutorial](tutorial.md) on the Solstice example app.
- Configure specs, roles, and guards in the [Configuration reference](configuration.md).
- Share a hosted link for team review in [Hosted operations](hosted-share.md).
- Connect your coding agent over stdio or OAuth HTTP in the [MCP guide](mcp.md).
