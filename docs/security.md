# Security and trust

Proto is a closed product. The npm package contains bundled code and public type declarations;
the public repository contains documentation, skills, schema and examples. Read the [EULA](../LICENSE).

Proto does not collect product analytics or telemetry from local authoring and review. Local
operations work offline. Explicit cloud operations send the authentication, snapshot and review
data needed to provide the service. Hosted services retain operational records, billing state and
MCP usage for service operation and plan enforcement; these are not local telemetry.

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
