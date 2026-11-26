# Hosted operations

Publish a prototype, flow or gallery to Proto Cloud so your team can review it from a browser.

## Publish and review a share

1. **Publish.** Sign in with `proto login`. Use `proto whoami` and `proto workspace list` to check your account and workspaces, then select a Pro workspace with `proto workspace use <slug>`.

   ```sh
   proto share stay-checkout --note "Ready for review"
   ```

   Use the link printed by the CLI to open the share. Publish the same target again to update its snapshot.

2. **Invite reviewers.** Pass `--viewer`, `--commenter` or `--approver` when publishing, or add people after publishing.

   ```sh
   proto share invite stay-checkout --commenter reviewer@example.com
   ```

   Invitees open the hosted link and sign in with their invited email.

3. **Read and resolve comments.** Open the share to work through its threads, or use the workspace inbox to find feedback across shares. Use the CLI or MCP to reply and resolve from your editor. See [Workspace collaboration](workspace.md) and the remote store examples below.

4. **Approve.** Have a human reviewer with approval access review the current version and approve it in the browser.

5. **Revoke.** Find shares with `proto share list` and use `proto share revoke <slug>` to remove access when review is complete.

## Snapshots, access and versions

Publishing requires a signed-in Editor and a Pro workspace. Each snapshot persists after the command exits. Publish exactly one target with `proto share <slug>`, `proto share --flow <id>` or `proto share --all`.

The version note is optional and can be 1–280 characters. Proto tries to capture up to 60 light-theme 640×400 WebP previews in registry order and uses the first as the cover. Unchanged snapshots keep their stored thumbnails and note. Use `--no-captures` to skip screenshots.

Free includes local authoring, human review and static builds. [Local agent operations](cli.md)
require their own online checks. Interactive `proto dev`, `proto start`, `proto init` and `proto mcp` require a free account. Use Google, GitHub or an email link in the browser during `proto login`. Run `proto logout` to remove your CLI session; it succeeds if you are already signed out.

## Reference

### Publish options and errors

Use `--app <dir>` to select the app and `--json` for structured output. The invite flags accept email addresses and can each be repeated. Publish JSON returns `captures` (the stored capture count) and `note` (the version note or null). In a Free workspace, `proto share` returns `plan_required` with the workspace's upgrade URL and changes nothing.

Publishing continues if Playwright or Chromium is missing. The CLI prints the Playwright install command, or the Chromium install command, for your package manager (npm, pnpm, Yarn or Bun) on stderr. Capture allows 15 seconds per state and 120 seconds overall. Failed and timed-out captures are skipped with one warning.

### CLI sign-in

Finish sign-in and accept the terms in the browser before approving the device. The browser returns to the same device code after acceptance. If polling reports `legal_required`, the CLI names that browser page and asks you to retry login after acceptance. The refused attempt saves no credential.

The CLI probes the active API origin with a three-second timeout. Only HTTP 401 or explicit credential rejection in another 4xx response requires replacing credentials. All other responses and transport failures let interactive commands start. A truthy `CI` skips
this startup check. Pro agent operations still need an online decision.

Headless local commands, including `check`, `build`, `stories run`, `migrate`, `stop` and `status`, plus help, version output and the Vite/Storybook/Vitest integrations (`proto()` and `protoPresentation()`), need no login. Cloud commands still require the appropriate account and plan.

### Remote store commands and MCP

Store commands use `--remote --share <slug>`. For example:

```sh
proto comments list --remote --share checkout --json
proto comments reply checkout-1 --note "Updated the empty state." --remote --share checkout --json
proto comments resolve checkout-1 --remote --share checkout --json
proto review status --remote --share checkout --json
```

CLI commands with `--remote --share <slug>` use the hosted share's access rules. The local stdio
server `proto mcp --app <dir>` accepts `remote: true` and `share` on store tools. Each call through
that server still needs local agent access. For hosted access without a checkout, connect an OAuth-capable Streamable HTTP client to `https://mcp.protohq.design/mcp` and authorize the intended workspace in the browser. Remote tools operate within that OAuth grant. CLI credentials are issued separately.

Manage grants and CLI devices in **Settings → CLI and agent access**. Revoking a grant ends access. Remote MCP provides share discovery, inbox, comment replies, resolve and reopen, attachment access, and review status. Publishing and billing are outside the remote MCP tool set. Approval always requires a person in the browser.

### Environment overrides

`PROTOHQ_TOKEN` supplies a CLI credential. `PROTOHQ_WORKSPACE` selects the workspace. Keep tokens out of project config, logs and documentation.

> **Advanced / self-testing.** `PROTOHQ_API_URL` accepts a loopback URL for local development or exactly `https://staging-api.protohq.design` for staging. Any other override returns `api_url_refused`. The published CLI always uses production for local agent checks and allowance status.

See the [error registry](errors.md) for exact codes.
