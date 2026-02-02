# 001: Node.js Update to LTS 18+

**Status**: 🟡 In Progress  
**Priority**: High  
**Phase**: 1 (Foundation)  
**Estimated Effort**: 1-2 days  
**Dependencies**: None

## Description

Update the minimum Node.js version requirement from 12+ to 18+ (LTS). This is a breaking change that will enable us to use modern JavaScript features and remove legacy compatibility code.

## Current State

- Minimum Node.js version: `^12 || >=14` (from package.json)
- CI tests against: Node 12.x, 14.x, 16.x, 18.x, 20.x
- Node 12 reached EOL in April 2022
- Node 14 reached EOL in April 2023
- Node 16 reached EOL in September 2023

## Target State

- Minimum Node.js version: `>=18.0.0`
- CI tests against: Node 18.x (Active LTS), 20.x (Active LTS), 22.x (Current)
- Remove all Node 12/14/16 compatibility workarounds
- Use modern JavaScript features available in Node 18+

## Benefits

- Access to modern JavaScript features (Top-level await, fetch API, etc.)
- Better performance with V8 improvements
- Security updates and active support
- Simplified codebase (remove polyfills/workarounds)
- Faster CI (fewer matrix combinations)

## Stylus Documentation References

N/A (Infrastructure task)

## Migration Strategy

### 1. Update package.json

**Current:**

```json
{
  "engines": {
    "node": "^12 || >=14"
  }
}
```

**Target:**

```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### 2. Update CI/CD Configuration

Update `.github/workflows/NodeCI.yml`:

**Current matrix:**

```yaml
matrix:
  node-version: [18.x, 20.x]
  # Also tests 12.x, 14.x, 16.x in other jobs
```

**Target matrix:**

```yaml
matrix:
  node-version: [18.x, 20.x, 22.x]
```

### 3. Update Development Environment

- Update or create `.nvmrc` to `18`
- Update documentation to reflect new requirements
- Update local development instructions

### Breaking Changes

- **BREAKING**: Drops support for Node.js 12, 14, and 16
- Users on old Node versions must upgrade to continue using new versions
- This will require a major version bump: **v2.0.0**

### Backward Compatibility

None - this is intentionally a breaking change. Users on old Node versions can continue using v1.x.

## Tasks Checklist

### Research Phase

- [x] Verify Node.js LTS schedule
- [x] Check if any dependencies require Node 18+
- [x] Identify modern features we can now use
- [x] Plan version bump strategy

### Implementation Phase

- [ ] Update `package.json` engines field to `"node": ">=18.0.0"`
- [ ] Update `.nvmrc` file (if exists) to `18`
- [ ] Update GitHub Actions workflows:
  - [ ] Remove Node 12.x from test matrix
  - [ ] Remove Node 14.x from test matrix
  - [ ] Remove Node 16.x from test matrix
  - [ ] Add Node 22.x to test matrix
  - [ ] Update `test-for-other-node-version` job to only test Node 18+
- [ ] Remove `--legacy-peer-deps` from CI where possible
- [ ] Test locally on Node 18, 20, 22

### Testing Phase

- [ ] Verify all tests pass on Node 18.x
- [ ] Verify all tests pass on Node 20.x
- [ ] Verify all tests pass on Node 22.x
- [ ] Run full test suite including fixtures
- [ ] Test installation with `npm install` on all versions

### Documentation Phase

- [ ] Update README.md with new Node.js requirements
- [ ] Add migration notes for v2.0.0
- [ ] Update installation instructions
- [ ] Document breaking changes in CHANGELOG

## Testing Requirements

- [ ] All existing tests pass on Node 18.x
- [ ] All existing tests pass on Node 20.x
- [ ] All existing tests pass on Node 22.x
- [ ] No test failures due to Node version differences
- [ ] CI pipeline passes on all supported versions

## Success Criteria

- [ ] `package.json` engines field updated
- [ ] CI tests only Node 18, 20, 22
- [ ] All CI jobs pass
- [ ] Documentation reflects new requirements
- [ ] Local testing on all versions successful
- [ ] Breaking change documented

## Rollback Plan

If issues are discovered:

1. Revert `package.json` changes
2. Revert CI workflow changes
3. Re-add older Node versions to test matrix
4. Investigate and fix issues
5. Re-attempt when ready

## Notes

### Node.js LTS Schedule (2024-2026)

- **Node 18**: Active LTS until April 2025, Maintenance until April 2026
- **Node 20**: Active LTS until April 2026, Maintenance until April 2027
- **Node 22**: Current → Active LTS October 2024, Maintenance until April 2029

### Modern Features Available in Node 18+

- Native Fetch API
- Top-level await
- Error.cause
- Array.prototype.at()
- Object.hasOwn()
- Improved ES modules support
- Better performance

### Impact on Users

Users on Node 12/14/16 will need to:

1. Upgrade Node.js to 18+ (recommended: 20 LTS)
2. Or stay on stylelint-stylus v1.x (no new features/fixes)

This is standard practice for Node.js tools as versions reach EOL.

## Files to Update

- `/package.json` - engines field
- `/.nvmrc` - if it exists
- `/.github/workflows/NodeCI.yml` - CI configuration
- `/README.md` - installation requirements
- `/CHANGELOG.md` - breaking change notice (create if doesn't exist)

## Related Issues

- #002 - Dependency Updates (benefits from Node 18+)
- #004 - Vitest Migration (Vitest works best on modern Node)
- #007 - TypeScript Setup (TypeScript targets can be modernized)

## Next Steps After Completion

Once this issue is complete:

1. Move to #002 (Dependency Updates)
2. Consider using modern JavaScript features in codebase
3. Remove any Node 12/14/16 polyfills or workarounds
