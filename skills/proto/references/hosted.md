# Hosted operations

Local authoring and review work offline. Hosted publishing requires a signed-in Editor and an
eligible trial or Pro workspace. Run `proto login`, `proto whoami`, `proto workspace list`, then
`proto workspace use <slug>`. `proto logout` removes the CLI session.

Publish exactly one target: `proto share <slug>`, `proto share --flow <id>`, or `proto share --all`.
Optional repeated `--viewer`, `--commenter`, and `--approver` flags take email addresses.
Use `--app <dir>` to select the app and `--json` for structured output. The first successful
publish starts an eligible workspace's trial. Snapshots persist after the command exits.

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
`PROTOHQ_API_URL` accepts only loopback overrides for local development. Never put tokens in
project config, logs or documentation. See [errors](errors.md) for exact registry codes.

Read [remote MCP](remote-mcp.md) for OAuth consent identity, the nine tools, quotas and grant last use.

## Web collaboration

Workspace home lists hosted shares, review/lifecycle status and trial/plan controls. The inbox
filters threads by status, share and participation, with pagination and links into the hosted shell.
Owners/admins manage invitations, roles and Editor seats on Members. Workspace invitations load
`GET /v1/invitations/{id}` and require explicit `POST /v1/invitations/{id}/accept` after signing in
with the invited email. Agents must not treat invitation previews or pending billing changes as
completed membership changes.
