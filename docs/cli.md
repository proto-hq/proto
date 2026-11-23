# CLI and configuration

Install `@protohq/cli` in a React 19 + Vite 8 app, then run `proto login`, `bun run proto init --skills`, and `bun run proto dev`. Pass `--app <dir>` in a monorepo. The binary is named `proto`.

## Invocation and account model

```sh
proto <command> [positionals] [options] [--json] [--app <dir>] [--verbose]
```

- `--json` prints a single JSON value on stdout. Human output is for people and may change. Exception: `proto mcp --json` writes startup errors to stderr so stdout stays reserved for JSON-RPC.
- App selection uses `--app <dir>` (relative to the working directory, or `apps/<dir>`). Without it, Proto walks up to the nearest `proto.config.ts`, then tries a single `apps/*/proto.config.ts`. Multiple matches fail with `app_required`.
- Unknown flags, missing values, and extra positionals exit `2`. `proto --help` lists commands and `proto --version` prints the installed version.
- `--remote` works only on comment commands, review commands, and `proto url`, always paired with `--share <slug>`.

Free runs locally, including authoring, review, and static builds. Interactive commands (`proto dev`, `proto start`, `proto init`, and `proto mcp`) require a free account (Google, GitHub, or an email link through `proto login`); CI is exempt when `CI` is set to a non-empty value other than `false` or `0`. Headless local commands (`check`, `build`, `stories run`, `migrate`, `stop`, `status`) and Vite/Storybook/Vitest integrations need no login. Stored sessions remain usable offline.

When upgrading from `0.1.x`, replace legacy package imports with `@protohq/cli` across every workspace manifest and remove any legacy `remote` block nested under `review` in `proto.config.ts`; run `proto login` instead for hosted review access.

## Shared local address and lifecycle

`proto dev` starts Proto in the background when needed and serves every project gallery under one address:

```console
$ proto dev
Started Proto in the background. Stop it with: proto stop
Proto    http://127.0.0.1:4400/p/solstice/
Home     http://127.0.0.1:4400/
```

- Ctrl-C stops only the project running in that terminal. Other projects and Proto stay up.
- `proto start` and `proto stop` manage the background server idempotently. Stopping Proto leaves project terminals alive and waiting for the next `proto start`; their isolated preview servers remain reachable.
- `proto status --json` inspects daemon state, versions, project URLs, and preview origins without starting anything.
- `proto dev --json` prints one stdout JSON line and sends later lifecycle updates to stderr.
- `PROTOHQ_PORT` chooses Proto's port (default `4400`, remembered between starts). Stop Proto before changing the port (`proto stop`, then `PROTOHQ_PORT=4500 proto start`).
- Use `proto url <slug>` for a gallery link and `proto url <slug> --bare` for the isolated preview URL after the project's first start.

## Command groups

| Group                                             | Commands                                                                                                                                                                                           |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lifecycle                                         | `proto init`, `proto dev`, `proto start`, `proto stop`, `proto status`, `proto build`, `proto mcp`                                                                                                 |
| Discovery & checks                                | `proto list`, `proto check`, `proto url`, `proto flow list`, `proto flow show`, `proto flow coverage`                                                                                              |
| Scaffolding & evidence                            | `proto new`, `proto flow new`, `proto screenshot`, `proto evidence`                                                                                                                                |
| Review store (local or `--remote --share <slug>`) | `proto comments list`, `show`, `add`, `reply`, `resolve`, `reopen`, `edit`, `attach`, `detach`, `attachments`, `delete`; `proto review status`                                                     |
| Human-only review & account                       | `proto review approve`, `proto review reopen`, `proto review unlock`, `proto login`, `proto logout`, `proto whoami`, `proto workspace list`, `proto workspace use`, `proto share`, `proto migrate` |

See the generated [command catalog](commands.md) for the complete CLI and local MCP matrix, and the [CLI skill reference](../skills/proto/references/cli.md) for detailed JSON response shapes.

## Exit codes and errors

| Exit | Meaning                         | Typical codes                                                                                                           |
| ---- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `0`  | Success (warnings allowed)      | —                                                                                                                       |
| `1`  | Check problems or runtime error | `invalid_config`, `slug_taken`, `comment_not_found`, `port_in_use`, `daemon_unavailable`, `project_offline`, `key_busy` |
| `2`  | Usage error                     | Unknown command or flag, missing argument, `app_required`                                                               |
| `3`  | Missing optional peer           | `playwright_missing`, missing `@modelcontextprotocol/sdk`                                                               |
| `4`  | Remote or authentication error  | `not_logged_in`, `auth_required`, `plan_required`, `seat_required`, `cli_outdated`                                      |

Structured errors print `{ "error": { "code", "message" } }` with `--json`. Every code and HTTP status is listed in the [error registry](errors.md).

## Configuration

Configuration lives in `proto.config.ts` using `defineProtoConfig` from `@protohq/cli/config`. Every key, type, and default is documented in [Configuration](configuration.md) and mirrored in the [JSON Schema](../schema/proto-config.schema.json). Because JavaScript functions, regular expressions, and cross-field rules cannot be expressed in JSON Schema, always validate your config with `proto check`.

For Vite, Storybook, and Vitest setup see the [setup skill](../skills/proto/references/setup.md); for prototypes, flows, and canvas patterns see the [authoring skill](../skills/proto/references/authoring.md).
