# Solstice — Proto review-loop example

A small React 19 + Vite 8 travel booking app demonstrating `@protohq/cli` prototypes, flows,
states, roles and anchored review comments.

## Run locally

```sh
bun install
bun run check
bunx proto login
bunx proto dev --open
```

`bun run check` runs `proto check && vite build` to verify every prototype, flow and production
boundary guard.

Sign in with a free Proto account before opening the gallery. Use the address printed by
`proto dev` (normally `http://127.0.0.1:4400/p/solstice/`).
