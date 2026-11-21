# Changelog

## Unreleased

## v0.2.1

### Fixes

- The npm package page now links to the `proto-hq/proto` repository for source, issues and docs.

## v0.2.0

### Features

- Serve every local project at one Proto address, with a project home and project switching.
- Add `proto start`, `proto stop` and `proto status` with JSON output for agents. Project terminals
  survive a Proto stop and reconnect on start; Ctrl-C stops only the current project.

### Migration to one local address (**breaking**)

- Replace `@compozy/proto` with `@protohq/cli` in every import and pin the new version in every
  workspace manifest that uses it, not only the gallery app's manifest.
- Remove a legacy `review.remote` block from `proto.config.ts`; run `proto login` instead for
  hosted review access.
- Remove `dev.port` from `proto.config.ts`. Every project now uses Proto's shared address;
  `dev.poll` and `dev.allowedHosts` remain supported. An old port key fails with `invalid_config`.
- Replace `--port` on `proto dev`, `proto stories run` and `proto stories url` with
  `PROTOHQ_PORT` when selecting Proto's address. The flag now fails as `invalid_input` (exit 2).
- `PROTOHQ_PORT` used to select a per-project gallery port, with the preview at the next port.
  It now selects the shared background Proto port (default 4400), remembered for later starts
  and URL commands. Stop Proto before starting with a different value. Previews and story roots
  have reserved per-project addresses; discover previews with `proto url <slug> --bare` and
  running story addresses with `proto status --json`.
- Gallery links now use `http://127.0.0.1:4400/p/<label>/`; `/` lists all known projects.
  Replace bookmarks that used a project gallery at `/` with its printed project URL.
- `proto dev --json` used to return `{ origin, renderOrigin }`. It now writes one stdout JSON
  line with `{ url, home, label, projectId, state, renderOrigin }` and keeps serving the project;
  lifecycle updates and warnings go to stderr. A second invocation returns `already_running`
  and exits 0; its `renderOrigin` may be `null` during startup.
- `project_mismatch` is removed. Captures find the owning project through its lock and verify
  its server instance. `project_busy` identifies another capture or a startup that did not finish
  within 60 seconds; `project_offline` identifies a project that stopped or lacks a preview address.
- Rerun `proto init --skills` to refresh shipped agent guidance and rewrite an older fixed-preview
  design record to `preview: "proto url {slug} --bare"`. Regenerate evidence to replace embedded
  local origins with source paths. Committed review files are unchanged; old unsent browser
  comment drafts are left in place and are not migrated into the project-specific draft store.

### Hosted collaboration

- Proto is distributed as `@protohq/cli`, with free local authoring and review under its EULA.
- Hosted snapshots support invitations, comments and browser approval.
- Workspace identity, Editor seats and billing support hosted collaboration.
- CLI login and explicit share selection connect local agent workflows to hosted review.

---

This curated changelog describes user-facing changes. Published release notes identify released versions.
