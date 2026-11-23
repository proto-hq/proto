# Solstice — Proto review-loop example

A small React 19 + Vite 8 travel booking app demonstrating `@protohq/cli` prototypes, flows,
states, roles and anchored review comments.

## Run locally

```sh
bun install
bun run check
bunx proto dev --open
```

`bun run check` runs `proto check && vite build` to verify every prototype, flow and production
boundary guard.
