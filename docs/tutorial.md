# Tutorial: the review loop

Walk through a complete design-and-engineering review loop on **Solstice**, the self-contained React 19 + Vite 8 example app in [`examples/review-loop`](../examples/review-loop/README.md). You will open live prototypes and flows, pin a comment directly to an element, inspect the JSX source chain from the CLI, resolve the thread as an agent, and approve the screen as a human reviewer.

## 1. Run the Solstice example

Clone the public repository and start the example gallery:

```sh
git clone https://github.com/proto-hq/proto.git
cd proto/examples/review-loop
bun install
bunx proto login
bunx proto dev --open
```

`proto dev` starts the shared local Proto server (default port `4400`) and prints the project address:

```console
Started Proto in the background. Stop it with: proto stop
Proto    http://127.0.0.1:4400/p/review-loop/
Home     http://127.0.0.1:4400/
```

The overview lists the **Booking & stays** spec (`booking`), two component prototypes (`stay-checkout` and `trip-inbox`), and one multi-step flow (`booking`).

![Proto gallery overview for Solstice showing specs, flow coverage and live prototype thumbnails](assets/overview.webp)

## 2. Inspect how prototypes compose real views

Open `src/components/stay-checkout.proto.tsx`. Instead of copying markup into a throwaway sandbox, the prototype imports the production `StayCheckout` view and drives its states (`ready`, `member-discount`, `loading`, `card-error`, `confirmed`) through fixture props from `stay-checkout.fixtures.ts`.

`proto.config.ts` declares the spec, preview roles (`guest`, `member`, `host`), and the network guard:

```ts
import { defineProtoConfig } from "@protohq/cli/config";

export default defineProtoConfig({
  title: "Solstice",
  prototypes: "src/**/*.proto.tsx",
  locale: "en",
  specs: {
    booking: "Booking & stays",
  },
  roles: {
    guest: "Guest",
    member: "Member",
    host: "Host",
  },
  guards: {
    forbidRuntimeImports: ["src/lib/api.ts"],
  },
});
```

Because `src/lib/api.ts` is listed in `guards.forbidRuntimeImports`, `proto check` immediately fails if any prototype or view pulls in a live API client.

## 3. Walk the booking flow

Click **Stay booking** in the sidebar to open `flows/booking.flow.ts`. The canvas connects six prototype states — from `ready` and `member-discount` through `loading`, `card-error`, `confirmed`, and the terminal `trip-inbox` screen — with live previews at every step.

![Proto flow canvas showing the Solstice Stay booking journey with live prototype nodes](assets/flow-canvas.webp)

Verify the flow graph and state coverage from the terminal at any time:

```sh
bunx proto flow show booking
bunx proto flow coverage
bunx proto check
```

## 4. Pin a comment in the browser

Open **Stay checkout** (`stay-checkout`), switch states, themes, roles, or viewport widths in the top bar, and press **C** to enter comment mode. Click any element (or drag a region) and leave a note.

Proto records the CSS selector, bounding rectangle, active state, theme, role, viewport size, Git commit, and the exact JSX source chain (`file:line:column`) of the clicked component, storing it in `proto/review/stay-checkout.json`.

![Proto screen view showing an anchored review comment thread and agent reply on Solstice](assets/screen-comments.webp)

## 5. Read, fix, and resolve from the CLI or MCP

A coding agent — or a developer working in the terminal — reads open comments as structured JSON without opening a browser:

```sh
bunx proto comments list --json
bunx proto comments show stay-checkout-1 --json
```

Each comment's `target.source` and `target.sourceChain` point straight to the component line (for example `src/components/stay-checkout.tsx:108:11`). After updating the production view and running `bunx proto check`, reply and resolve the thread:

```sh
bunx proto comments resolve stay-checkout-1 --note "Moved total breakdown above the Reserve button." --json
```

If you connect an agent through [`proto mcp`](mcp.md), the same actions run through `proto_comments_list`, `proto_comments_show`, `proto_comments_reply`, and `proto_comments_resolve`.

## 6. Approve as a human reviewer

Agents can reply, attach screenshots, and resolve threads, but **agents never approve** — approval is intentionally omitted from MCP. Once you have checked the updated screen in the browser, click **Approve** in the gallery header (or run `bunx proto review approve stay-checkout`).

If another comment arrives later, the screen automatically returns to **In review** so nothing ships silently.

## Where to go next

- Publish Solstice to a hosted link for teammates in [Hosted operations](hosted-share.md).
- Explore every CLI command and JSON shape in [CLI and configuration](cli.md).
- Review every `proto.config.ts` option in [Configuration](configuration.md).
