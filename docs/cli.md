# CLI and configuration

Install `@protohq/cli` in a React/Vite app, then run `bun run proto init --skills` and
`bun run proto dev`. For a monorepo pass `--app <dir>`. The binary is named `proto`.
The [setup skill](../skills/proto/references/setup.md) covers Vite, Storybook and optional peers.
The [authoring skill](../skills/proto/references/authoring.md) covers prototypes, flows and canvas.

When upgrading from `@compozy/proto`, replace it with `@protohq/cli` in every import and pin the
new version in every workspace manifest, not only the gallery app. Remove any legacy `remote`
block nested under `review` in `proto.config.ts`; run `proto login` instead for hosted review access.

`proto dev` prints `http://127.0.0.1:4400/p/<label>/`; `/` lists all known projects. Ctrl-C
stops only the current project. `proto start` and `proto stop` manage Proto in the background;
`stop` leaves project terminals waiting for the next start. `proto status --json` inspects states,
versions and preview addresses without starting anything. All three lifecycle commands support
`--json`; `proto dev --json` prints one stdout JSON line and sends later lifecycle updates to stderr.
`PROTOHQ_PORT` chooses Proto's port (default 4400, remembered); stop it before changing the port.
Use `proto url <slug> --bare` to discover a preview address after the project's first start.

Use `proto check` before `proto build`. `proto list --json` lists prototypes.
See the [command catalog](commands.md) and [CLI reference](../skills/proto/references/cli.md).
Successful commands exit 0. Errors use `{error:{code,message}}`; exact exit codes are in the
[generated error registry](errors.md). Use `--json` for automation.

Configuration lives in `proto.config.ts`, using `defineProtoConfig` from `@protohq/cli/config`.
The JSON Schema describes the serializable config fields. JavaScript functions and RegExp values,
custom refinements, cross-field constraints and environment overrides are validated by the CLI;
JSON Schema is not a substitute for `proto check`.
