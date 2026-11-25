# Changelog

## Unreleased

## v0.2.3

### Help and first run

- `proto --help` groups commands, and `proto <command> --help` shows that command's arguments,
  options and docs link. `--json` returns help and version output as JSON.
- Running a command outside a Proto app reports `not_initialized` with the `proto init` or
  `--app <dir>` fix. Invalid config errors name their cause, and JSON errors no longer contain
  terminal color codes.
- Install hints for Playwright and Chromium, and the `proto init` and `proto login` recovery
  commands, use your package manager (npm, pnpm, Yarn or Bun).
- `proto new` without a valid target shows both usage forms. `proto logout` succeeds when you are
  already signed out.

### Login and sharing

- `proto login` honors the API's retry wait and backs off on rate limits. It reports
  `rate_limited` with `retryAfterSeconds`, `service_unavailable` for persistent server errors,
  `network_unavailable` for connection failures, and `login_interrupted` when a login may have
  completed during an outage.
- `proto share` retries a busy publish up to three times within 60 seconds, printing one progress
  line per wait on stderr. It reports `publish_busy` if the window runs out. `--json` output stays
  one JSON document.
- Seat changes that Stripe is still confirming report `billing_update_pending`.

### Fixes

- `--json` output stays clean when Vite plugins log to stdout; their logs go to stderr.
- `proto dev` refreshes Tailwind CSS when prototype or draft files are added or removed.
- Screenshots and share captures wait for animations and transitions to finish.

## v0.2.2

### Interactive account requirement

- Free still runs locally, but `dev`, `start`, `init` and `mcp` now require a free account via
  `proto login` (Google, GitHub or an email link). Other local headless commands and integrations
  remain login-free. Runners that do not export `CI` must set `CI=1` or provide `PROTOHQ_TOKEN`.
- The bounded session probe sends CLI headers (version, platform/architecture, device kind and
  hostname in `User-Agent`) to the Proto API. Stored sessions work offline; only explicit
  credential rejection blocks interactive use. `proto mcp --json` startup errors use stderr
  to preserve its JSON-RPC stdout stream.

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
