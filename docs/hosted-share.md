# Hosted operations

Free still runs locally, including authoring, review and static builds. Interactive commands
(`proto dev`, `proto start`, `proto init` and `proto mcp`) need a free account: run `proto login`
and sign in with Google, GitHub or an email link in the browser. CI is exempt when `CI` is set
to a nonempty value other than `false` or `0` (case insensitive). `PROTOHQ_TOKEN` also supplies a
session. The CLI probes the active API origin with a three-second timeout. Only HTTP 401 or
explicit credential rejection in another 4xx response requires replacing credentials; all other
responses and transport failures keep local access. Headless local commands, including `check`, `build`, `stories run`, `migrate`,
`stop` and `status`, plus help, version output and the Vite/Storybook/Vitest integrations
(`proto()` and `protoPresentation()`), do not need login. Cloud commands keep their existing
account and plan requirements.

Local authoring and review work offline. Hosted publishing requires a signed-in Editor and a
Pro workspace. Run `proto login`, `proto whoami`, `proto workspace list`, then
`proto workspace use <slug>`. `proto logout` removes the CLI session.

Publish exactly one target: `proto share <slug>`, `proto share --flow <id>`, or `proto share --all`.
Optional repeated `--viewer`, `--commenter`, and `--approver` flags take email addresses.
During `proto login`, finish Google/GitHub or email sign-in and accept the terms in the browser
before approving the device. The browser returns to the same device code after acceptance. If
polling reports `legal_required`, the CLI names that browser page and asks you to retry login
once acceptance is complete; no credential is saved for the refused attempt.

Use `--app <dir>` to select the app and `--json` for structured output. On a Free workspace,
`proto share` answers `plan_required` with the workspace's upgrade URL and changes nothing.
Snapshots persist after the command exits.

Publish with `--note "Ready for review"` to attach a 1–280 character version note. Proto captures
up to 60 light-theme 640×400 WebP previews in registry order and uses the first as the cover.
Use `--no-captures` to skip screenshots. If Playwright is missing, publishing continues and
prints "Thumbnails need Playwright: npm i -D playwright" on stderr. If Chromium is missing,
it prints "Thumbnails need Chromium: npx playwright install chromium". Capture allows 15 seconds
per state and 120 seconds overall. Failed and timed-out captures are skipped with one warning.
Publish JSON adds `captures` (the stored capture count) and `note` (the version note or null).
An unchanged snapshot keeps its stored thumbnails and note.

Use `proto share list`, `proto share invite <slug> --commenter <email>` and
`proto share revoke <slug>`. Publish again to update a target's snapshot. People review through
the hosted link; invitees sign in with their invited email. Approvals happen in the browser.

Store commands use `--remote --share <slug>`, for example:

```sh
proto comments list --remote --share checkout --json
proto comments reply checkout-1 --note "Updated the empty state." --remote --share checkout --json
proto review status --remote --share checkout --json
```

The local stdio server `proto mcp --app <dir>` accepts `remote: true` and `share` on store tools.
For hosted access without a checkout, configure an OAuth-capable Streamable HTTP MCP client with
`https://mcp.protohq.design/mcp`. Complete browser authorization for the intended workspace.
Remote tools operate within that grant; CLI credentials are not remote MCP OAuth grants.
Manage grants and CLI devices in Settings → CLI and agent access. Revoking a grant ends access.
Agents never approve reviews. Remote MCP provides share discovery, inbox, comment replies,
resolve/reopen, attachment access and review status; it does not publish or manage billing.

`PROTOHQ_TOKEN` supplies a CLI credential, `PROTOHQ_WORKSPACE` selects the workspace, and
`PROTOHQ_API_URL` accepts a loopback override for local development or exactly
`https://staging-api.protohq.design` to target staging (links then use
`https://staging-app.protohq.design`); any other value fails with `api_url_refused`. Never put tokens in
project config, logs or documentation. See [errors](errors.md) for exact registry codes.
