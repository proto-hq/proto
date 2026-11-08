# proto (public surface)

Public repository of Proto (`github.com/proto-hq/proto`). It holds only the product surface: README,
`docs/`, `skills/`, `schema/`, `examples/`, community files and CI. No source code, tests, specs or
internal notes ever land here — `bun run check:surface` enforces the allowlist.

- Content under `docs/`, `skills/`, `schema/` and `examples/` is generated in the private
  `proto-hq/platform` repository and synced here; change it there.
- `bun run verify` is the definition of done (format check + surface allowlist).
- Commits follow Conventional Commits without scope (`docs: ...`), enforced by commitlint.
- English only.
