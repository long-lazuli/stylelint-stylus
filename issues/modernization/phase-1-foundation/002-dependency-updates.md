# 002: Dependency Updates

**Status**: 🔵 In Review  
**Priority**: High  
**Phase**: 1 (Foundation)  
**Estimated Effort**: 2-3 days  
**Dependencies**: #001 (Node.js Update)

## Description

Update all project dependencies to their latest stable versions, focusing on security, compatibility, and removing deprecated packages.

## Summary of Changes

### Node.js Minimum Bumped to 20+

During dependency updates, ESLint v9 and its ecosystem plugins require Node >=20. Updated:

- `package.json` engines: `>=20.0.0`
- `.nvmrc`: `20`
- CI matrix: `[20.x, 22.x]`

### ESLint + Prettier → Biome

Replaced the entire ESLint + Prettier toolchain with [Biome](https://biomejs.dev/) for faster linting and formatting:

- **Removed** `eslint`, `prettier`, and **13 related plugins/configs**
- **Added** `@biomejs/biome@2.3.13` (single dependency replaces all of the above)
- **Deleted** `eslint.config.js` and `.prettierrc.json`
- **Created** `biome.json` with configuration matching the existing coding style:
  - 4-space indentation, no semicolons, double quotes, trailing commas
  - Recommended lint rules with project-specific overrides
  - VCS integration (respects `.gitignore`)
- Updated `package.json` scripts: `lint` → `biome check .`, `lint:fix` → `biome check --fix .`
- Updated `.gitignore`: replaced `.eslintcache` with `.biome/`
- Applied Biome auto-fixes: optional chaining modernization across codebase
- Removed all empty JSDoc comments (`/** \n * \n */`) from 22 files
- Fixed `noAccumulatingSpread` in `lib/utils/reference/selector.js`

### Production Dependencies Updated

| Package                   | From       | To                                     |
| ------------------------- | ---------- | -------------------------------------- |
| `postcss-styl`            | `^0.12.2`  | `^0.12.3`                              |
| `postcss-html`            | `^1.0.1`   | `^1.8.0`                               |
| `postcss-selector-parser` | `^6.0.2`   | `^6.1.2`                               |
| `lodash`                  | `^4.17.15` | `^4.17.21`                             |
| `html-tags`               | `^3.1.0`   | `^3.3.1` (kept at v3, v4+ is ESM-only) |
| `semver`                  | `^7.5.4`   | `^7.7.0`                               |
| `stylelint-config-html`   | `^1.0.0`   | `^1.1.0`                               |

### Dev Dependencies Updated

| Package         | From        | To        |
| --------------- | ----------- | --------- |
| `postcss`       | `^8.0.0`    | `^8.5.0`  |
| `postcss-scss`  | `^4.0.1`    | `^4.0.9`  |
| `@types/lodash` | `^4.14.149` | `^4.17.0` |
| `pako`          | `^2.0.4`    | `^2.1.0`  |

### Packages Removed

- `eslint` and all ESLint plugins (`@eslint/markdown`, `@ota-meshi/eslint-plugin`, `eslint-config-prettier`, `eslint-plugin-jsdoc`, `eslint-plugin-json-schema-validator`, `eslint-plugin-jsonc`, `eslint-plugin-n`, `eslint-plugin-prettier`, `eslint-plugin-regexp`, `eslint-plugin-yml`)
- `prettier`

### Packages Added

- `@biomejs/biome@2.3.13` (replaces ESLint + Prettier)

### Kept at Current Versions (intentional)

- `html-tags@3` — v4+ is ESM-only, CJS needed until Phase 4
- `mathml-tag-names@2` — v3+ is ESM-only
- `svg-tags@1` — only version available
- `style-search@0.1` — only version available
- `postcss-selector-parser@6` — v7 has potential API breaks
- `mocha@9` / `nyc@15` — will be replaced by Vitest in Phase 2

## Audit Status

8 vulnerabilities (1 low, 7 moderate) — all in dev-only packages:

- `mocha` dependencies (js-yaml, nanoid, serialize-javascript, diff) — will be resolved when replaced by Vitest in Phase 2
- `vitepress`/`esbuild` — docs tooling only, no production impact

## Testing

- **Tests**: 854 passing, 36 failing (all pre-existing, zero regressions)
- **Lint**: Clean (0 errors, 0 warnings) — `biome check .` passes on 142 files

## Files Changed

- `package.json` — dependency versions, engines `>=20.0.0`, scripts updated for Biome
- `.nvmrc` — changed to `20`
- `.github/workflows/NodeCI.yml` — matrix updated to `[20.x, 22.x]`
- `.eslintrc.js` — **deleted** (replaced by Biome)
- `.eslintignore` — **deleted** (replaced by Biome)
- `eslint.config.js` — **deleted** (replaced by Biome)
- `.prettierrc.json` — **deleted** (replaced by Biome)
- `biome.json` — **created** (Biome config: linting + formatting)
- `.gitignore` — updated (`.eslintcache` → `.biome/`)
- `custom-syntax/index.js` — fixed `node/` → `n/` in eslint-disable comments
- `tests/utils/tester.js` — fixed `node/` → `n/` in eslint-disable comment
- `lib/rules/pythonic.js` — removed dead lodash import
- `lib/utils/reference/selector.js` — fixed `noAccumulatingSpread` (replaced `reduce` with `for...of`)
- 22 files — removed empty JSDoc comments (`/** \n * \n */`)
- Multiple files — Biome auto-fixes (optional chaining, formatting)

## Related Issues

- #001 - Node.js Update (prerequisite, completed)
- #003 - CI/CD Updates (next)
- #004 - Vitest Migration (will resolve mocha audit vulnerabilities)
