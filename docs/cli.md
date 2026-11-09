# CLI and configuration

Install `@protohq/cli` in a React/Vite app, then run `bun run proto init --skills` and
`bun run proto dev`. For a monorepo pass `--app <dir>`. The binary is named `proto`.
The [setup skill](../skills/proto/references/setup.md) covers Vite, Storybook and optional peers.
The [authoring skill](../skills/proto/references/authoring.md) covers prototypes, flows and canvas.

Use `proto check` before `proto build`. `proto list --json` lists prototypes.
See the [command catalog](commands.md) and [CLI reference](../skills/proto/references/cli.md).
Successful commands exit 0. Errors use `{error:{code,message}}`; exact exit codes are in the
[generated error registry](errors.md). Use `--json` for automation.

Configuration lives in `proto.config.ts`, using `defineProtoConfig` from `@protohq/cli/config`.
The JSON Schema describes the serializable config fields. JavaScript functions and RegExp values,
custom refinements, cross-field constraints and environment overrides are validated by the CLI;
JSON Schema is not a substitute for `proto check`.
