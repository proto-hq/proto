#!/usr/bin/env bash
# Fails when the public repository contains anything outside the published surface allowlist.
# Source code, tests and specs live only in the private proto-hq/platform repository.
set -euo pipefail
cd "$(dirname "$0")/.."
allowed='^(README\.md|CHANGELOG\.md|LICENSE|SECURITY\.md|CODE_OF_CONDUCT\.md|CONTRIBUTING\.md|CLAUDE\.md|AGENTS\.md|package\.json|bun\.lock|\.gitignore|\.editorconfig|\.bun-version|\.node-version|\.oxfmtrc\.json|\.commitlintrc\.yaml|\.husky/.*|\.github/.*|scripts/(postinstall|check-surface)\.sh|docs/.*|skills/.*|schema/.*|examples/.*)$'
bad=$(git ls-files | grep -Ev "$allowed" || true)
leak=$(git ls-files | grep -E '\.(ts|tsx|map)$' | grep -Ev '^examples/' || true)
if [ -n "$bad$leak" ]; then
  echo "Files outside the public surface:"; printf '%s\n' $bad $leak; exit 1
fi
echo "Public surface OK"
