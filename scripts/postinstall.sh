#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
# CLAUDE.md is canonical; AGENTS.md is a relative symlink to it.
rm -f "$ROOT_DIR/AGENTS.md" && ln -s "CLAUDE.md" "$ROOT_DIR/AGENTS.md"
