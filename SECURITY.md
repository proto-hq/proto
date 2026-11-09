# Security policy

Report vulnerabilities privately through this repository's GitHub Security advisory reporting
feature. Include affected versions, reproduction steps, impact and a minimal example with no
credentials or customer data. Do not disclose an exploitable issue in a public bug report.

Use the current released CLI. Security fixes are delivered through package updates and hosted
service updates. See [security and trust](docs/security.md) for credential and snapshot boundaries.

## Release verification

`@protohq/cli` is built and published from private CI using a granular npm token,
without npm provenance. There is no public source attestation to verify.
Check the intended version and channel with `npm view @protohq/cli dist-tags`,
and inspect `npm view @protohq/cli@<version> dist.integrity`. npm verifies this
SHA-512 integrity when installing the registry archive. Compare the version with
the matching tag and curated GitHub Release at <https://github.com/proto-hq/proto/releases>.
Public tags identify the documentation surface, not the private source commit.
These checks establish registry artifact and release consistency, not build-origin proof.
