# Proto

Build interactive prototypes from the real components of your product, then review them with your
team, your clients and your AI agents.

> Proto is in private beta. Documentation, agent skills and the configuration schema land here as
> the product opens up.

## What lives here

| Path        | Contents                                                                                 |
| ----------- | ---------------------------------------------------------------------------------------- |
| `docs/`     | User documentation: getting started, CLI, sharing, reviews, the MCP server               |
| `skills/`   | Agent skills (`proto`, `proto-apply-comments`) for Claude Code, Codex, Cursor and others |
| `schema/`   | JSON Schema for `proto.config.ts`                                                        |
| `examples/` | Small standalone projects that show prototypes and flows                                 |

The Proto source code is not published. Report bugs and request features in
[Issues](https://github.com/proto-hq/proto/issues); ask questions in
[Discussions](https://github.com/proto-hq/proto/discussions).

## Install

```bash
npm i -D @protohq/cli
npx proto init
npx proto dev
```

Local use is free. Hosted sharing, team reviews and the remote MCP server are part of Proto Pro.
