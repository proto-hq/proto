# Troubleshooting

If `proto` prints moonrepo toolchain-manager help, your PATH selects another program with the same
name. Check `command -v proto` and use the project binary with `bun run proto --version` or
`./node_modules/.bin/proto --version`. Keep project scripts explicit instead of removing another
project's toolchain manager.

For multiple apps, pass `--app <dir>`. For hosted operations, run `proto whoami` and check the active
workspace. Store operations need both `--remote` and `--share <slug>`. A stale snapshot requires a
reload before review. See [errors](errors.md) and the
[troubleshooting skill](../skills/proto/references/troubleshooting.md).
