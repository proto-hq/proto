# Getting started

Install `@protohq/cli` in a React 19 + Vite 8 application. Local authoring, review in the gallery,
and static builds are Free, including for commercial projects. Pro includes local MCP tool calls
and the local `comments *`, `screenshot`, and `evidence` commands. You can try them with a
one-time allowance of 100 free operations per account. See [CLI and configuration](cli.md).

## Prerequisites

- **React 19** and **Vite 8** installed in the target app. Proto compiles prototypes with your app's own Vite config and React installation.
- **Node.js 22+** or **Bun** to run the `proto` CLI.
- A free Proto account for interactive local commands (`proto dev`, `proto start`, `proto init`, `proto mcp`). Sign in with Google, GitHub, or an email link through `proto login`. `CI=1` skips the Free startup sign-in check. Headless Free commands (`proto check`, `proto build`, `proto status`, `proto stop`, `proto migrate`) need no login. Pro operations still need an online check in CI.

## Install and initialize

Run the commands for your package manager inside your app directory. From a monorepo root, pass
`--app <dir>` to select the app.

**npm**

```sh
npm i -D @protohq/cli
npx proto login
npx proto init --skills
npx proto dev --open
```

**Bun**

```sh
bun add -d @protohq/cli
bunx proto login
bunx proto init --skills
bunx proto dev --open
```

**pnpm**

```sh
pnpm add -D @protohq/cli
pnpm exec proto login
pnpm exec proto init --skills
pnpm exec proto dev --open
```

`proto init` sets up the gallery alongside your production app.

- `proto.config.ts` — gallery title, specs, roles, and build/network guards.
- `proto.canvas.tsx` — exports `Canvas` (providers and app CSS) and optional `Frame` chrome.
- `src/drafts/welcome/index.proto.tsx` — a starter draft you can open immediately.
- `proto()` added to your `vite.config.ts` plugins array so prototype code can never leak into your production bundle.
- `docs/design/prototyping.md` documents the local prototyping setup.
- `proto/review/.gitignore` sets up ignore rules for local review artifacts.

With `--skills`, Proto also installs the `proto` and `proto-apply-comments` skills into
`.agents/skills/` at the repository root.

Optional peer dependencies are only needed if you use those specific features:

| Feature                              | Optional peer                           | Setup                                                        |
| ------------------------------------ | --------------------------------------- | ------------------------------------------------------------ |
| Screenshots and HTML evidence        | `playwright` (`^1.64.0`)                | `npm i -D playwright` then `npx playwright install chromium` |
| Local stdio MCP server (`proto mcp`) | `@modelcontextprotocol/sdk` (`^1.32.2`) | `npm i -D @modelcontextprotocol/sdk`                         |

With Bun or pnpm, use the same install and command prefixes as above.

## Write your first component prototype

In `proto.config.ts`, add a `booking` spec so the gallery can group the checkout prototype under
**Booking & stays**.

```ts
import { defineProtoConfig } from "@protohq/cli/config";

export default defineProtoConfig({
  title: "Prototypes",
  specs: { booking: "Booking & stays" },
});
```

Create a small checkout view in `src/components/stay-checkout.tsx`.

```tsx
type StayCheckoutProps = {
  status: "ready" | "error" | "confirmed";
  onSubmit: () => void;
};

export function StayCheckout({ status, onSubmit }: StayCheckoutProps) {
  if (status === "confirmed") return <p>Your stay is confirmed.</p>;

  return (
    <section>
      <h1>Stay checkout</h1>
      {status === "error" && <p role="alert">Your card was declined.</p>}
      <button type="button" onClick={onSubmit}>
        Reserve stay
      </button>
    </section>
  );
}
```

Place the prototype next to the view. Export a static `meta` object with `definePrototype` and
a default React component that passes fixture props.

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

- **npm:** `npx proto check`
- **Bun:** `bunx proto check`
- **pnpm:** `pnpm exec proto check`

`proto check` validates every prototype's static `meta`, verifies every flow target and edge, and enforces `guards.forbidRuntimeImports` so prototypes stay pure presentation views without hitting live backends.

## Next steps

- Follow the [review loop tutorial](tutorial.md) on the Solstice example app.
- Configure specs, roles, and guards in the [Configuration reference](configuration.md).
- Share a hosted link for team review in [Hosted operations](hosted-share.md).
- Connect your coding agent over stdio or OAuth HTTP in the [MCP guide](mcp.md).
