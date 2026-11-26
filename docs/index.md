# Proto documentation

Proto is a live prototype gallery and review loop for React 19 + Vite 8 apps. Write `*.proto.tsx` files beside your real views, let people pin comments directly to elements and flow steps, and let your coding agent read, fix, and resolve threads through the CLI or MCP while people stay in charge of approval.

Authoring and human review in the gallery are Free. Local MCP tool calls and the local
`comments *`, `screenshot`, and `evidence` commands are Pro, with a one-time allowance of
100 free operations per account. See [CLI and configuration](cli.md).

## Start here

- [Getting started](getting-started.md) — install `@protohq/cli`, sign in, initialize your app, and open the local gallery.
- [Tutorial: the review loop](tutorial.md) — walk through the Solstice booking example from live screen to anchored comment, agent fix, and approval.

## Guides

- [Workspace collaboration](workspace.md) — hosted shares, the workspace inbox, team roles, and Editor seats.
- [Hosted operations](hosted-share.md) — `proto login`, `proto share`, version notes, thumbnails, and remote store commands.
- [MCP](mcp.md) — connect local stdio MCP (`proto mcp`) or hosted OAuth Streamable HTTP MCP to your coding agent.
- [Troubleshooting](troubleshooting.md) — diagnose `proto check` problems, Vite plugin gating, daemon startup, and Storybook setups.

## Concepts & reference

- [Security and trust](security.md) — closed distribution model, isolated rendering origins, data boundaries, and release verification.
- [CLI and configuration](cli.md) — lifecycle commands, shared local address, JSON output contracts, and exit codes.
- [Command catalog](commands.md) — generated table of every CLI command and local MCP tool.
- [Configuration](configuration.md) — generated reference for every `proto.config.ts` key and environment override.
- [Error registry](errors.md) — generated table of every CLI exit code, HTTP status, and error message.
- [Remote MCP tool inputs](remote-inputs.md) — generated JSON Schemas for every hosted MCP tool.
