# Workspace collaboration

Use your Proto Cloud workspace to manage hosted shares, review feedback and give teammates access.

## Work through a review

1. **Publish a share.** Follow [Hosted operations](hosted-share.md) to publish from the CLI. Find it in the workspace home and open its link to review it.
2. **Invite reviewers.** Give each person access to the share as a viewer, commenter or approver. To invite someone to the workspace itself, go to **Members**. Owners and admins can invite members and manage permitted membership changes.
3. **Read and resolve comments.** Open the workspace inbox. Filter by open or resolved status, share or participation. Select a thread to jump to its location in the hosted shell, where you can reply, resolve or reopen it. Use the pagination control to load more threads.
4. **Approve.** Have a human reviewer with approval access open the share in the browser and approve the current version. Publishing a new version reopens an approved share for review.
5. **Revoke.** Revoke the share from the workspace home when review is complete.

## Shares, membership and billing

The workspace home shows each share's target, version, review status and lifecycle. It also shows plan status and offers a path to upgrade to Pro. Plan loss can pause hosted access. Upgrading restores eligible shares.

The inbox keeps filters in the URL so they survive reloads and can be shared. Replies and resolve or reopen actions update the review discussion.

The members page shows workspace roles and Editor seats. Member invitations grant workspace membership. Share invitations grant the assigned role on one share. Editor seats are assigned separately, and seat changes can require a billing update. Check the result before relying on a new or changed seat.

To manage billing, open the workspace billing page and follow its Checkout or Portal flows. For devices and agent grants, see **Settings → CLI and agent access** and the [MCP guide](mcp.md).

## Reference

### Accepting a workspace invitation

Open the emailed link and sign in with the invited email. Return to the invitation after sign-in, verify your email if prompted, then explicitly accept.

The invitation page calls `GET /v1/invitations/{id}` to display the workspace, inviter, role and expiry. It calls `POST /v1/invitations/{id}/accept` when you accept. Expired links show `invitation_expired` and existing members see `member_exists`. A different account or unavailable invitation returns `not_found`. The page preserves billing and network errors so you can retry.
