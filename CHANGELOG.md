# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Breaking Changes

- **BREAKING**: Minimum Node.js version is now 20.0.0 (dropped support for Node.js 12, 14, 16, and 18)
    - Users on older Node.js versions should stay on v1.0.0

### Internal Improvements

- Updated CI to test on Node.js 20 and 22
- Updated GitHub Actions to v4 (`actions/checkout@v4`, `actions/setup-node@v4`, etc.)
- Added npm caching to CI for faster builds
- Removed legacy `test-for-other-node-version` CI job
- Removed `--openssl-legacy-provider` workaround from GHPages workflow
- Added `.nvmrc` file for consistent development environment
- Migrated ESLint from v8 to v9 with flat config (`eslint.config.js`)
- Updated Prettier from v2 to v3
- Updated all production and dev dependencies to latest compatible versions
- Replaced deprecated `eslint-plugin-node` with `eslint-plugin-n`
- Replaced deprecated `eslint-plugin-markdown` with `@eslint/markdown`
- Removed dead lodash import from `pythonic.js`

## [1.0.0] - 2024-01-01

- Add support for stylelint v16

## [0.18.0]

- Previous releases (see git history)
