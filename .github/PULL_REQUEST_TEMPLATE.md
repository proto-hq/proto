## What & why

Describe what changes and why, and link the issue it closes (`Closes #12`), or write
`No issue: <reason>`. Content under `docs/`, `skills/`, `schema/` and `examples/` is generated in
the private product repository and synced here; a change to it names the sync it comes from.

## How you verified it

Name the commands you ran (`bun run verify`: format check and the public-surface allowlist) and
anything you checked by hand, such as rendered Markdown or links, with their results.

## Impact

Name what this changes for readers and agents: the published docs, the Proto skills, the
configuration schema, the examples, or community and CI files. Say whether `README.md` or
`CHANGELOG.md` needed an update, or why not.

---

- [ ] `bun run verify` passes; this PR is delivered only after its CI checks are green
- [ ] No source code, tests, specs or internal notes are added (the surface allowlist passes)
- [ ] If an agent wrote or co-wrote this, I named it above and verified the result myself
