# Workspace collaboration

The workspace home lists hosted shares with target, version, review status and lifecycle. Open a
share to review it, inspect trial or plan status, start an eligible trial, or revoke a share when
finished. Plan loss can pause hosted access; upgrading restores eligible shares. Publishing a new
version reopens an approved share for review.

The workspace inbox collects comment threads across shares. Filter by open/resolved status, share
or participation, then load more results with the pagination control. Filters live in the URL so
they survive reload and can be shared. Opening a thread takes you to its location in the hosted
shell. Replies and resolve/reopen actions update the review discussion; approval remains a human
browser action.

The members page shows workspace roles and Editor seats. Owners and admins invite people and
manage permitted membership changes. Member invitations and share invitations are separate:
workspace membership does not automatically make a person a paid Editor, and a share invite grants
its assigned viewer, commenter or approver access to that share. Seat changes can require billing
updates; do not assume a failed or pending change has completed.

## Accepting a workspace invitation

Open the emailed invitation link and sign in with the invited email. The invitation page loads
`GET /v1/invitations/{id}` to show the workspace, inviter, role and expiry, then waits for explicit
acceptance through `POST /v1/invitations/{id}/accept`. Signed-out users return after sign-in.
An unverified account must verify its email. Expired links show `invitation_expired`; an existing
member sees `member_exists`. A different account or unavailable invitation produces `not_found`.
The page preserves billing and network errors for retry instead of claiming acceptance.

For device and agent grant management, use Settings → CLI and agent access as described in
[MCP](mcp.md). Billing is managed through the workspace billing page and its Checkout/Portal flows.
