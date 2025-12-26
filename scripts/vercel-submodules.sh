#!/usr/bin/env bash
set -euo pipefail

if [ -z "${GITHUB_TOKEN:-}" ]; then
  echo "GITHUB_TOKEN is not set"
  exit 1
fi

git config --global url."https://${GITHUB_TOKEN}@github.com/".insteadOf "https://github.com/"

git submodule sync --recursive
git submodule update --init --recursive
