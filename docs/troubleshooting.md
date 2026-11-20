# Troubleshooting

If `proto` prints moonrepo toolchain-manager help, your PATH selects another program with the same
name. Check `command -v proto` and use the project binary with `bun run proto --version` or
`./node_modules/.bin/proto --version`. Keep project scripts explicit instead of removing another
project's toolchain manager.

For multiple apps, pass `--app <dir>`. For hosted operations, run `proto whoami` and check the active
workspace. Store operations need both `--remote` and `--share <slug>`. A stale snapshot requires a
reload before review. See [errors](errors.md) and the
[troubleshooting skill](../skills/proto/references/troubleshooting.md).

For local startup failures, inspect `~/.config/protohq/daemon/daemon.log` and run
`proto status --json`. `port_in_use` means the Proto address or preview ports are unavailable;
set `PROTOHQ_PORT` before starting to move Proto. `daemon_unavailable` means Proto did not start
or answer; `daemon_version_mismatch` requires a newer package in the project;
`state_unavailable` means private state cannot be used. `project_busy` identifies an ongoing
capture or startup; `project_offline` means the project is stopped or has no preview address yet.
`proto start --json` and `proto stop --json` are idempotent. After a deliberate stop, project
terminals wait until `proto start`; an unexpected stop triggers automatic recovery.
