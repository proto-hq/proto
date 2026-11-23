# Troubleshooting

Find the symptom below and fix the root cause. Never silence a build or network guard by turning it off.

## `proto` resolves to moonrepo

If `proto` prints moonrepo toolchain-manager help, another binary named `proto` appears earlier on your `PATH`. Run `command -v proto` to confirm, and invoke your project binary explicitly with `bun run proto --version`, `bunx proto --version`, or `./node_modules/.bin/proto --version`.

## `proto check` problems

- **`markup`**: a component prototype contains lowercase HTML elements. Move markup into the production view component or expose a prop.
- **`invalid_meta`**: `meta` must be a static object literal with `title` and `states`, and drafts must live at `<drafts>/<slug>/index.proto.tsx`.
- **`invalid_slug` / `reserved_slug` / `duplicate_slug`**: prototype slugs are kebab-case derived from the file name (`stay-checkout.proto.tsx` → `stay-checkout`), cannot start with `flow-`, and must be unique across prototypes and drafts.
- **`unknown_spec` / `unknown_role`**: register the id under `specs` or `roles` in `proto.config.ts`, or fix the typo.
- **`network_import`**: inspect the reported `chain` and cut the first import reaching a forbidden module. Often a view imports a query hook or API client, or the prototype imports a barrel `index.ts` that re-exports data modules. Note that `network_import` only runs after registry problems are resolved.
- **`unknown_prototype` / `unknown_state` / `unknown_node` / `unreachable` / `dead_end`**: check `proto list --json` for valid slugs and states, add missing edges, or mark terminal nodes with `end: true`.
- **`specs_unavailable` / `canvas_missing` / `uncovered_state`**: these are non-failing warnings. `specs_unavailable` occurs when a `specs` function returns `null` (for example when an ignored folder is absent in CI); leave it rather than returning `{}`.

## Render origin and Vite plugins

`proto dev`, `proto check`, `proto build`, `proto screenshot`, and `proto evidence` compile prototypes using your app's `vite.config.*` in `proto-render` mode.

- **App-only plugins interfere during prototype rendering** (route generators, devtools, error-upload plugins, proxies): gate them in `defineConfig(({ mode }) => ...)` and skip them when `mode === "proto-render"`.
- **Prototypes render unstyled**: import your app stylesheet inside `proto.canvas.tsx`. CSS loads on the render origin only through the canvas.
- **One theme looks wrong**: the render host toggles `.dark` and `color-scheme` on `html`. If your design system uses a different convention, apply the `theme` prop inside `Canvas`.
- **`host_not_allowed`**: open the gallery at `127.0.0.1` or add the extra hostname (without a port) to `dev.allowedHosts`.

## Local serving and daemon logs

Start by running `proto status --json` (it starts nothing) and inspecting `~/.config/protohq/daemon/daemon.log`.

- **`port_in_use`**: Proto's port or preview ports are occupied. Stop Proto with `proto stop` and start on another port with `PROTOHQ_PORT=4500 proto start`.
- **`daemon_unavailable`**: Proto did not start or answer; run `proto stop` then `proto start` and inspect `daemon.log`.
- **`daemon_version_mismatch`**: upgrade `@protohq/cli` in the project to match the running Proto server.
- **`state_unavailable`**: Proto cannot read or lock `~/.config/protohq/daemon`; fix permissions or the held state lock before retrying.
- **`project_busy`**: another capture or startup holds the project; wait or keep `proto dev` running to share a warm server.
- **`project_offline`**: the project is stopped or has not started once to reserve its preview address; run `proto dev` in that project folder.

`proto start --json` and `proto stop --json` are idempotent. After a deliberate `proto stop`, project terminals wait until `proto start`; an unexpected exit triggers automatic recovery.

## Hosted operations and store commands

- **Multiple apps**: pass `--app <dir>` when a workspace has more than one `proto.config.ts` (`app_required`).
- **Wrong account or workspace**: run `proto whoami` and `proto workspace list`, then switch with `proto workspace use <slug>`.
- **Remote comment commands**: always pass both `--remote` and `--share <slug>`. Reload a stale snapshot before reviewing.
- **`key_busy`**: another writer holds the local review lock; retry. Use `proto review unlock <key> --force` only for manual recovery when a person requests it.

## Storybook, Vitest, and optional peers

- **`production_boundary` during `storybook build`**: Storybook loaded `vite.config.ts` which includes `proto()`. Extract shared React/Tailwind/alias settings into `vite.shared.ts`, point Storybook's `viteConfigPath` at it, and add `protoPresentation()` in `viteFinal`.
- **`playwright_missing`** (exit `3`): install `playwright` and run `bunx playwright install chromium`. Re-run browser installation after upgrading Playwright.
- **Legacy `0.1.x` skills**: run `proto init --skills` to install the current `proto` and `proto-apply-comments` skills, then remove any `author-prototype` or `apply-prototype-comments` folders reported under `legacySkills`.

See the [error registry](errors.md) for every code and exit status, and the [troubleshooting skill reference](../skills/proto/references/troubleshooting.md) for agent-specific recovery steps.
