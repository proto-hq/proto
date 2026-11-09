# Error registry

Generated from the shipped registry. A dash means the transport does not assign a code.

| Code                     | CLI exit | HTTP | Message                                                                                 |
| ------------------------ | -------- | ---- | --------------------------------------------------------------------------------------- |
| billing_busy             | 4        | 409  | A seat change is in progress. Try again.                                                |
| billing_update_failed    | 4        | 503  | Billing update failed, try again.                                                       |
| stripe_signature_invalid | —        | 400  | Invalid Stripe signature.                                                               |
| upload_incomplete        | 4        | 409  | Some files did not upload. Rerun the command.                                           |
| cli_outdated             | 4        | 426  | Update @protohq/cli to use Proto Cloud.                                                 |
| share_not_found          | 1        | 404  | No share with that name.                                                                |
| share_access_denied      | 1        | 403  | You do not have access to this share.                                                   |
| share_paused             | 4        | 423  | Paused by the workspace owner.                                                          |
| share_revoked            | 4        | 410  | This share is no longer available.                                                      |
| share_disabled           | 4        | 410  | This share was disabled.                                                                |
| version_pruned           | 1        | 410  | This version is no longer retained.                                                     |
| seat_required            | 4        | 403  | This action needs an Editor seat.                                                       |
| plan_limit_reached       | 4        | 402  | The workspace plan limit was reached.                                                   |
| snapshot_too_large       | 1        | 413  | Snapshots are limited to 50 MB, 5,000 files and 10 MB per file.                         |
| device_code_expired      | 4        | —    | The login code expired. Run proto login again.                                          |
| device_code_denied       | 4        | —    | The login was denied in the browser.                                                    |
| workspace_not_found      | 1        | 404  | No workspace with that slug.                                                            |
| forbidden                | 4        | 403  | You can't do this in this workspace.                                                    |
| member_exists            | 1        | 409  | This person is already in the workspace.                                                |
| last_owner               | 1        | 409  | A workspace needs an owner. Transfer ownership first.                                   |
| email_unverified         | —        | 403  | Verify your email before continuing.                                                    |
| invitation_expired       | 1        | 410  | Invitation expired.                                                                     |
| plan_required            | 4        | 402  | This needs Proto Pro.                                                                   |
| not_found                | 1        | 404  | Not found.                                                                              |
| not_logged_in            | 4        | 401  | Run proto login to sign in.                                                             |
| network_unavailable      | 4        | —    | Can't reach Proto Cloud. Check your connection.                                         |
| api_url_refused          | 1        | —    | PROTOHQ_API_URL must use a loopback host.                                               |
| share_target_required    | 2        | —    | Choose one: a slug, --flow <id> or --all.                                               |
| share_no_invitees        | 2        | —    | Invite someone with --approver or --commenter.                                          |
| share_dirty_tree         | 1        | —    | The snapshot contains uncommitted changes.                                              |
| share_target_not_found   | 1        | —    | No prototype or flow with that name.                                                    |
| storybook_missing        | 3        | —    | storybook is not installed in <root>; install storybook and @storybook/react-vite.      |
| storybook_unsupported    | 3        | —    | Storybook <version> is not supported; proto needs ~10.6.0.                              |
| story_not_found          | 1        | 404  | No story matches <id>.                                                                  |
| project_mismatch         | 1        | —    | The server on <port> belongs to another project; pass --port.                           |
| invalid_input            | 2        | 400  | Invalid request input.                                                                  |
| review_has_open_comments | 1        | 409  | Open comments remain; confirm before approving.                                         |
| snapshot_stale           | —        | 409  | A new version is live. Reload to review it.                                             |
| internal_error           | 1        | 500  | The review operation failed.                                                            |
| invalid_config           | 1        | —    | proto.config.ts is invalid.                                                             |
| not_a_vite_app           | 1        | —    | No Vite config found; pass --app <dir>.                                                 |
| app_required             | 2        | —    | Several apps found; pass --app <dir>.                                                   |
| port_in_use              | 1        | —    | The port is in use; pass --port.                                                        |
| slug_taken               | 1        | —    | A prototype with this slug already exists.                                              |
| comment_not_found        | 1        | 404  | Comment not found.                                                                      |
| message_not_owned        | 1        | 403  | Only the author can edit this message.                                                  |
| attachment_too_large     | 1        | 413  | Images are limited to 5 MB.                                                             |
| attachment_type          | 1        | 415  | Only PNG, JPEG, WebP or GIF images.                                                     |
| attachment_limit         | 1        | 422  | At most 6 images per message.                                                           |
| attachment_expired       | 1        | 410  | The upload expired; attach it again.                                                    |
| key_busy                 | 1        | 409  | The review key is busy; retry.                                                          |
| cross_origin_write       | —        | 403  | Writes must come from the gallery's own origin.                                         |
| ambiguous_credentials    | 4        | 400  | Send a session or a bearer credential, not both.                                        |
| auth_required            | 4        | 401  | Sign in to review.                                                                      |
| invalid_credential       | 4        | 401  | The credential is not valid.                                                            |
| scope_denied             | 4        | 403  | Approval happens in the browser; credentials cannot approve.                            |
| redirect_refused         | 4        | —    | The remote answered with a redirect; credentials are never re-sent.                     |
| schema_mismatch          | —        | 503  | The review database schema does not match; apply the server database migrations.        |
| playwright_missing       | 3        | —    | Playwright Chromium is not installed. Run: bunx playwright install chromium             |
| migration_conflict       | 1        | —    | A target key exists with different content.                                             |
| migration_unverified     | 1        | —    | Migration verification failed.                                                          |
| migration_source_changed | 1        | —    | The source changed during the run; put it in read-only mode, then re-run.               |
| source_not_read_only     | 1        | —    | The source accepted a write probe. Set PROTOTYPES_READ_ONLY=1 and drain requests first. |
| invalid_source           | 1        | 422  | Source paths must stay inside the app's source roots.                                   |
| host_not_allowed         | —        | 403  | Open the gallery at 127.0.0.1 or add the host to dev.allowedHosts.                      |
