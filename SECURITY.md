# Security Policy

## Reporting a vulnerability

Do not open a public issue. Report it privately through
[GitHub security advisories](https://github.com/proto-hq/proto/security/advisories/new) with the
affected version of `@protohq/cli` or the affected Proto Cloud URL, the steps to reproduce and the
impact you observed. You will get an acknowledgement within a few days.

## Scope

- `@protohq/cli` (the `proto` command, the local gallery and the stdio MCP server).
- Proto Cloud: `protohq.design`, `api.protohq.design`, `mcp.protohq.design` and shared prototypes on
  `*.protohq.app`.

Shared prototypes on `*.protohq.app` run code written by Proto customers in isolated origins.
Reports about one share reaching another share, the product origin or a reviewer's session are
especially welcome.
