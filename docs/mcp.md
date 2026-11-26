# MCP

Connect your coding agent to a local checkout over stdio or to your Proto Cloud workspace over
OAuth and HTTP.

## Connect your agent

### Local checkout (stdio)

Initialize the app with [Getting started](getting-started.md), install the optional MCP peer with
`npm i -D @modelcontextprotocol/sdk` (or the equivalent for your package manager), and sign in
with `proto login` if you have not already. Every local MCP tool call is a Pro agent operation.
An account without a Pro Editor seat can try them with a one-time allowance of 100 free
operations. Replace
`/absolute/path/to/app` with the location of the initialized app and use your installed `proto`
executable.

**Claude Code**

```sh
claude mcp add --transport stdio proto-local -- /absolute/path/to/app/node_modules/.bin/proto mcp --app /absolute/path/to/app
```

**Codex** · Add to `~/.codex/config.toml`.

```toml
[mcp_servers.proto-local]
command = "/absolute/path/to/app/node_modules/.bin/proto"
args = ["mcp", "--app", "/absolute/path/to/app"]
```

**Cursor** · Add to `.cursor/mcp.json`.

```json
{
  "mcpServers": {
    "proto-local": {
      "command": "/absolute/path/to/app/node_modules/.bin/proto",
      "args": ["mcp", "--app", "/absolute/path/to/app"]
    }
  }
}
```

`proto init --skills` installs `proto` and `proto-apply-comments` in `.agents/skills/` at the
repository root. The skills teach your agent how to author prototypes and act on review feedback.
Use the client setup above to give the agent MCP tools.

### Proto Cloud (remote HTTP)

Remote MCP requires a Pro workspace. Free workspaces can authorize a connection. Their tool
calls return `plan_required`. The free agent allowance applies to the local server.

Use these settings to work with hosted reviews without a checkout. Sign in in the browser and
authorize the workspace your agent should use.

**Claude Code**

```sh
claude mcp add --transport http proto https://mcp.protohq.design/mcp
```

Run `/mcp` in Claude Code, select **proto**, then choose **Authenticate**.

**Codex** · Add to `~/.codex/config.toml`.

```toml
[mcp_servers.proto]
url = "https://mcp.protohq.design/mcp"
```

```sh
codex mcp login proto
```

**Cursor** · Add to `.cursor/mcp.json` in the project or `~/.cursor/mcp.json` for every project.

```json
{
  "mcpServers": {
    "proto": { "url": "https://mcp.protohq.design/mcp" }
  }
}
```

Open **Cursor Settings → Tools & MCP**, find **proto**, and choose **Connect**.

## Local server behavior

The local server reserves stdout for MCP. Starting it interactively requires a free account from
`proto login` (Google, GitHub or an email link). A truthy `CI` skips this startup check. Starting
the server and listing tools use no operations. Login failures exit nonzero and write only to
stderr. With `--json`, stderr carries the JSON error envelope.

Proto Cloud checks each tool call online before the operation runs, including tools with a Free
CLI equivalent. In CI, supply a Pro Editor seat holder's CLI token in `PROTOHQ_TOKEN`. When
Proto Cloud cannot confirm access, the tool returns an error without running the operation.
The [command catalog](commands.md) lists local tools. Store tools accept `remote: true` and an
explicit `share` after CLI login and still undergo the local agent check.

The final MCP text item can start with `[Proto]` and carry an allowance notice. Relay it once per
stage (first use, low, used up). On `plan_required` or `seat_required`, stop the paid step and
show the returned message and action URL from `next`. Free CLI commands and human review in
the gallery remain available.

## Hosted connection and consent

Configure an OAuth-capable Streamable HTTP client with `https://mcp.protohq.design/mcp`.
The endpoint accepts POST; legacy clients are rejected. Protected-resource metadata is available at
`https://mcp.protohq.design/.well-known/oauth-protected-resource` and its `/mcp` suffix.
The authorization server is `https://api.protohq.design/auth`, with discovery under
`/auth/.well-known/oauth-authorization-server` on the API host.

Clients register through a Client ID Metadata Document (CIMD) or Dynamic Client Registration (DCR).
Use the client's normal OAuth flow with PKCE S256; do not paste CLI tokens into the MCP connection.
For CIMD, client metadata comes from an HTTPS URL with public-routable DNS. DCR supports public
clients; native clients declare their native application type for loopback callbacks.

Sign in in the browser, inspect the consent screen's primary client identity, choose the workspace,
and explicitly authorize. For CIMD the primary identity is the metadata origin. Registered clients
show their redirect hosts and an **Unverified app** label; their self-declared display name is
secondary and is not proof of identity. Every tool runs as you within the selected workspace.
Browser sessions and CLI tokens cannot call MCP; MCP OAuth tokens cannot call the application API.

## Tools and results

All nine tools use the [generated input schemas](remote-inputs.md). `share` is a share slug,
`id` is a comment ID, and cursors are opaque. Optional fields may be omitted.
Successful results are JSON encoded in MCP text content; tool failures return `isError: true`
with the shared error envelope. Invalid or revoked OAuth credentials fail HTTP authorization.

| Tool                         | Input summary                                          | Result                                                                                                                                                                                                  |
| ---------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `proto_shares_list`          | `cursor?`                                              | `{shares, nextCursor}`; entries include share, target, review status/version/approval, lifecycle, invitee count, URL and last publication time. Pages contain up to 50 entries.                         |
| `proto_share_show`           | `share`                                                | `{share, target, lifecycle, url, review, invitations, versions}`; invitations contain email/role and versions contain number, snapshot, publication time/author and pruned state.                       |
| `proto_inbox`                | `status?`, `share?`, `involving?`, `cursor?`, `limit?` | `{threads, nextCursor}`; threads include id, share, key, status, excerpt, author, message count, update time and shell URL. Defaults: open status and limit 50. Limit is 1–100; involving accepts `me`. |
| `proto_comments_show`        | `share`, `id`                                          | Full comment thread with messages and attachment metadata.                                                                                                                                              |
| `proto_comments_reply`       | `share`, `id`, `body`                                  | `{id, messageId}`; trimmed body must contain 1–10,000 characters.                                                                                                                                       |
| `proto_comments_resolve`     | `share`, `id`                                          | `{id, status: "resolved"}`.                                                                                                                                                                             |
| `proto_comments_reopen`      | `share`, `id`                                          | `{id, status: "open"}`.                                                                                                                                                                                 |
| `proto_comments_attachments` | `share`, `id`                                          | `{attachments}` with attachment metadata and download URLs. Links expire after 15 minutes and recheck grant, membership and share access.                                                               |
| `proto_review_status`        | `share`                                                | `{status, version, approvedBy, approvedVersion, approvedAt}`; approval fields may be null.                                                                                                              |

Remote MCP cannot publish, invite, revoke shares, delete comments, approve reviews or manage billing.

## Usage and access management

Free workspaces can authorize, but tool calls return `plan_required`. Pro workspaces have
100,000 calls per Editor seat per UTC calendar month, pooled within the workspace. Each admitted
tool invocation is metered before its operation, including an operation that subsequently fails.
Discovery and tool listing are not metered. An exhausted allowance returns `plan_limit_reached`
with `limit: "mcp_calls"`; it resets with the next UTC month. See the [error registry](errors.md).

Settings → CLI and agent access lists CLI devices and workspace-bound MCP grants with creation and
last-use information. An unused grant shows **Never**; authenticated MCP requests update last use.
The browser uses `GET /v1/me/grants` to obtain each grant's `id`, `clientId`, `name`, `workspace`,
`createdAt` and nullable `lastUsedAt`; `DELETE /v1/me/grants/{id}` revokes it. These endpoints require
a browser session. Revocation invalidates access on the next request; authorizing the same client
again does not revive old credentials.
