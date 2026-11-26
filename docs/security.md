# Security and trust

Proto is a closed product. The npm package contains bundled code and public type declarations;
the public repository contains documentation, skills, schema and examples. Read the [EULA](../LICENSE).

Proto does not collect product analytics or telemetry from local authoring and review. Free
headless commands work offline. Every local MCP tool call and every local `comments *`,
`screenshot`, or `evidence` invocation needs online authorization from Proto Cloud before the
operation runs. Without a Pro Editor seat, an admitted operation uses one of the account's
100 free operations, granted once and never reset.

The request body is an empty JSON object. The request sends the CLI login token, the selected
workspace if set, the CLI version, platform and architecture, device kind, and the hostname in
`User-Agent`. It identifies that a local agent operation was requested without sending a
command or tool name, arguments, paths, comments, captures, or other prototype content. Hosted operations send the authentication, snapshot, and review data needed
to provide those features. See the [Privacy Policy](https://protohq.design/legal/privacy/).

Review snapshots may contain executable application code. Publish only content you intend to share,
use fixtures instead of real customer data, and never embed secrets in client-side code. Hosted
rendering uses a separate origin from the product shell. Access requires authentication and share
permissions; a link is not a public anonymous publishing mechanism.

CLI credentials and MCP grants have separate scopes. Agents cannot approve reviews. Revoke devices
and grants in Settings → CLI and agent access. Never paste tokens into issues or commit them.
For vulnerability reporting, see [SECURITY](../SECURITY.md).

## Release verification

`@protohq/cli` is built and published from private CI using a granular npm token,
without npm provenance. There is no public source attestation to verify.
Check the intended version and channel with `npm view @protohq/cli dist-tags`,
and inspect `npm view @protohq/cli@<version> dist.integrity`. npm verifies this
SHA-512 integrity when installing the registry archive. Compare the version with
the matching tag and curated GitHub Release at <https://github.com/proto-hq/proto/releases>.
Public tags identify the documentation surface, not the private source commit.
These checks establish registry artifact and release consistency, not build-origin proof.
