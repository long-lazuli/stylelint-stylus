# 002: Dependency Updates

**Status**: 🔴 Not Started  
**Priority**: High  
**Phase**: 1 (Foundation)  
**Estimated Effort**: 2-3 days  
**Dependencies**: #001 (Node.js Update)

## Description

Update all project dependencies to their latest stable versions, focusing on security, compatibility, and removing deprecated packages. This includes peer dependencies, dev dependencies, and production dependencies.

## Current State

Major dependencies (from package.json):

- **stylelint**: `^16.0.0` ✅ (already updated)
- **postcss-styl**: `^0.12.2` (check for updates)
- **ESLint**: `^8.0.0` (v9 available with flat config)
- **Prettier**: `^2.2.1` (v3 available)
- **Mocha**: `^9.0.0` (will be replaced in Phase 2)
- **NYC**: `^15.0.1` (will be replaced in Phase 2)
- Various other utilities and plugins

## Target State

- All dependencies updated to latest compatible versions
- Security vulnerabilities resolved (`npm audit` clean)
- Deprecated dependencies replaced
- `--legacy-peer-deps` no longer needed
- Updated lockfile with modern algorithms

## Benefits

- Security improvements
- Bug fixes from upstream
- Performance improvements
- Better compatibility with modern tools
- Reduced technical debt

## Stylus Documentation References

N/A (Infrastructure task)

## Migration Strategy

### 1. Categorize Updates

**Critical (must update):**

- Security vulnerabilities
- EOL packages

**Important (should update):**

- Major version bumps with breaking changes
- Deprecated packages

**Nice to have (can update):**

- Minor/patch versions
- Developer experience improvements

### 2. Update Order

1. Peer dependencies (stylelint, postcss)
2. Build/lint tools (ESLint, Prettier)
3. Production dependencies
4. Development dependencies
5. GitHub Actions dependencies

### 3. Testing Strategy

After each category update:

1. Run `npm install`
2. Run `npm test`
3. Run `npm run lint`
4. Check for regressions

## Breaking Changes

### ESLint 8 → 9 Migration

ESLint 9 introduces flat config:

**Current (.eslintrc.js):**

```javascript
module.exports = {
  extends: ["@ota-meshi/eslint-plugin"],
  rules: {
    /* ... */
  },
};
```

**New (eslint.config.js):**

```javascript
import otaMeshi from "@ota-meshi/eslint-plugin";

export default [
  otaMeshi.configs.recommended,
  {
    rules: {
      /* ... */
    },
  },
];
```

### Prettier 2 → 3 Migration

Prettier 3 changes default formatting slightly:

- May need to update `.prettierrc` if exists
- Some default behaviors changed

## Tasks Checklist

### Audit Phase

- [ ] Run `npm outdated` and document all updates
- [ ] Run `npm audit` and note vulnerabilities
- [ ] Check for breaking changes in major updates
- [ ] Review changelogs for critical packages
- [ ] Identify deprecated packages to replace

### Peer Dependencies

- [ ] Verify stylelint v16 compatibility (already done)
- [ ] Update `postcss` to latest v8.x
- [ ] Update `postcss-syntax` if needed
- [ ] Test with stylelint v14, v15, v16

### Build Tools

- [ ] Update ESLint to v9.x
  - [ ] Migrate to flat config (create `eslint.config.js`)
  - [ ] Update ESLint plugins for v9 compatibility
  - [ ] Remove old `.eslintrc.js`
  - [ ] Test linting still works
- [ ] Update Prettier to v3.x
  - [ ] Update prettier config if needed
  - [ ] Run `npm run lint:fix` to reformat
  - [ ] Commit formatting changes separately

### Production Dependencies

- [ ] Update `postcss-styl` to latest
- [ ] Update `postcss-html` to latest
- [ ] Update `postcss-selector-parser` to latest
- [ ] Update `postcss-value-parser` to latest
- [ ] Update `postcss-media-query-parser` to latest
- [ ] Update `lodash` to latest (or consider removal)
- [ ] Update `semver` to latest
- [ ] Update `html-tags` to latest
- [ ] Update `mathml-tag-names` to latest
- [ ] Update `svg-tags` to latest
- [ ] Update `style-search` to latest
- [ ] Update `stylelint-config-html` to latest

### Development Dependencies

- [ ] Update `@ota-meshi/eslint-plugin` to latest
- [ ] Update ESLint plugins:
  - [ ] `eslint-plugin-eslint-comments`
  - [ ] `eslint-plugin-json-schema-validator`
  - [ ] `eslint-plugin-jsonc`
  - [ ] `eslint-plugin-markdown`
  - [ ] `eslint-plugin-node` → `eslint-plugin-n` (renamed)
  - [ ] `eslint-plugin-prettier`
  - [ ] `eslint-plugin-regexp`
  - [ ] `eslint-plugin-yml`
- [ ] Update `cross-env` to latest
- [ ] Update `pako` to latest
- [ ] Update `postcss-scss` to latest
- [ ] Keep Mocha/NYC for now (Phase 2 will replace)

### VitePress Dependencies

- [ ] Update `vitepress` to latest v1.x
- [ ] Update `@shikijs/vitepress-twoslash` to latest
- [ ] Test docs build: `npm run docs:build`

### GitHub Actions

- [ ] Update `actions/checkout` to v4
- [ ] Update `actions/setup-node` to v4
- [ ] Add caching for `node_modules`

### Security

- [ ] Run `npm audit fix`
- [ ] Manually fix any remaining vulnerabilities
- [ ] Verify no high/critical vulnerabilities remain

### Cleanup

- [ ] Remove `--legacy-peer-deps` from all scripts
- [ ] Update lockfile: `npm install`
- [ ] Clean install test: `rm -rf node_modules && npm install`

## Testing Requirements

- [ ] All tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Stylelint self-test passes (`npm run stylelint`)
- [ ] Docs build successfully (`npm run docs:build`)
- [ ] Installation works without legacy flags
- [ ] No audit vulnerabilities

## Success Criteria

- [ ] All dependencies updated
- [ ] `npm audit` shows 0 vulnerabilities
- [ ] No `--legacy-peer-deps` needed
- [ ] All tests pass
- [ ] ESLint migrated to v9 with flat config
- [ ] Prettier updated to v3
- [ ] Lockfile updated
- [ ] CI passes on all Node versions

## Rollback Plan

If critical issues are discovered:

1. Rollback specific package: `npm install package@old-version`
2. If ESLint v9 issues: Rollback to v8 temporarily
3. If multiple issues: Use git to restore package.json and lockfile
4. Investigate and fix issues
5. Re-attempt updates incrementally

## Notes

### Package-Specific Considerations

**lodash**: Consider replacing with native methods where possible to reduce bundle size.

**eslint-plugin-node**: Renamed to `eslint-plugin-n`. Update package name.

**Mocha & NYC**: Don't invest too much time here - will be replaced by Vitest in Phase 2.

**postcss-styl**: Critical dependency - test thoroughly with all fixtures after update.

### Version Pinning Strategy

For this project:

- **Peer dependencies**: Use caret ranges (`^16.0.0`) for flexibility
- **Dev dependencies**: Use caret ranges for latest features
- **Production dependencies**: Use caret ranges but test thoroughly

### Automation Opportunities

Consider setting up:

- Dependabot for automated dependency PRs
- Renovate bot as alternative
- `npm-check-updates` for easier dependency management

## Files to Update

- `/package.json` - all dependencies
- `/package-lock.json` - lockfile
- `/.eslintrc.js` → `/eslint.config.js` - ESLint config migration
- `/.prettierrc` - Prettier config (if needed)
- `/.github/workflows/*.yml` - Actions versions
- `/README.md` - Updated dependency versions in badges/docs

## Expected Changes

Run these commands to see what will update:

```bash
# See all outdated packages
npm outdated

# See security vulnerabilities
npm audit

# Preview what npm-check-updates would do
npx npm-check-updates
```

## Related Issues

- #001 - Node.js Update (prerequisite)
- #003 - CI/CD Updates (GitHub Actions updates)
- #004 - Vitest Migration (will replace Mocha/NYC)

## Next Steps After Completion

Once this issue is complete:

1. Move to #003 (CI/CD Updates)
2. Enjoy faster, more secure dependencies
3. Prepare for Vitest migration in Phase 2
