# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Breaking Changes

- **BREAKING**: Minimum Node.js version is now 18.0.0 (dropped support for Node.js 12, 14, and 16)
  - Node.js 12 reached EOL in April 2022
  - Node.js 14 reached EOL in April 2023
  - Node.js 16 reached EOL in September 2023
  - Users on older Node.js versions should stay on v1.0.0

### Internal Improvements

- Updated CI to test on Node.js 18, 20, and 22
- Updated GitHub Actions to v4 (`actions/checkout@v4`, `actions/setup-node@v4`, etc.)
- Added npm caching to CI for faster builds
- Removed legacy `test-for-other-node-version` CI job (Node 12/14/16 matrix)
- Removed `--openssl-legacy-provider` workaround from GHPages workflow
- Added `.nvmrc` file for consistent development environment

## [1.0.0] - 2024-01-01

- Add support for stylelint v16

## [0.18.0]

- Previous releases (see git history)
