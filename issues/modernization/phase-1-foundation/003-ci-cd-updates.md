# 003: CI/CD Updates

**Status**: 🔴 Not Started  
**Priority**: Medium  
**Phase**: 1 (Foundation)  
**Estimated Effort**: 1 day  
**Dependencies**: #001 (Node.js Update), #002 (Dependency Updates)

## Description

Modernize GitHub Actions workflows to use latest features, improve performance with caching, and simplify the CI matrix now that we only support Node 18+.

## Current State

Three workflow files:

- `.github/workflows/NodeCI.yml` - Main CI (lint + test)
- `.github/workflows/GHPages.yml` - Docs deployment
- `.github/workflows/NpmPublish.yml` - Package publishing

Current issues:

- Using `actions/checkout@v3` and `actions/setup-node@v3` (v4 available)
- No dependency caching
- Complex Node version matrix (testing 12-20)
- Uses `--legacy-peer-deps` flag
- No artifact uploading for coverage

## Target State

- Updated to latest GitHub Actions (v4)
- Dependency caching for faster builds
- Simplified test matrix (Node 18, 20, 22 only)
- Clean dependency installation (no legacy flags)
- Coverage artifacts uploaded
- Optimized workflow concurrency

## Benefits

- Faster CI builds (caching)
- More reliable (latest Actions versions)
- Simpler configuration
- Better insights (coverage artifacts)
- Cost savings (faster = less compute time)

## Stylus Documentation References

N/A (Infrastructure task)

## Migration Strategy

### Workflow Optimization Principles

1. **Use caching** - Cache node_modules between runs
2. **Fail fast** - Cancel outdated workflow runs
3. **Parallel when possible** - Run independent jobs in parallel
4. **Upload artifacts** - Save coverage reports and build outputs

### GitHub Actions Updates

**checkout v3 → v4**: Faster, better Git handling  
**setup-node v4**: Built-in caching support

## Tasks Checklist

### Main CI Workflow (NodeCI.yml)

- [ ] Update `actions/checkout@v3` → `@v4`
- [ ] Update `actions/setup-node@v3` → `@v4`
- [ ] Add dependency caching:
  ```yaml
  - uses: actions/setup-node@v4
    with:
      node-version: ${{ matrix.node-version }}
      cache: "npm"
  ```
- [ ] Remove `--legacy-peer-deps` from install commands
- [ ] Simplify Node version matrix to `[18.x, 20.x, 22.x]`
- [ ] Remove `test-for-other-node-version` job (no longer testing old versions)
- [ ] Update `test-for-other-version` to only test Stylelint 14, 15, 16
- [ ] Add concurrency group to cancel outdated runs:
  ```yaml
  concurrency:
    group: ${{ github.workflow }}-${{ github.ref }}
    cancel-in-progress: true
  ```
- [ ] Add coverage artifact upload:
  ```yaml
  - uses: actions/upload-artifact@v4
    if: always()
    with:
      name: coverage-report-${{ matrix.node-version }}
      path: coverage/
  ```

### GHPages Workflow (GHPages.yml)

- [ ] Update `actions/checkout@v3` → `@v4`
- [ ] Update `actions/setup-node@v3` → `@v4`
- [ ] Add dependency caching
- [ ] Remove `--legacy-peer-deps`
- [ ] Pin to Node 20.x (LTS) for docs build
- [ ] Add build artifact caching if beneficial

### Npm Publish Workflow (NpmPublish.yml)

- [ ] Update `actions/checkout@v3` → `@v4`
- [ ] Update `actions/setup-node@v3` → `@v4`
- [ ] Add dependency caching
- [ ] Remove `--legacy-peer-deps`
- [ ] Ensure uses Node 20.x for publishing
- [ ] Verify registry authentication still works

### New Workflows (Optional)

Consider adding:

- [ ] Dependabot configuration (`.github/dependabot.yml`)
- [ ] CodeQL security scanning
- [ ] Automated issue labeling
- [ ] PR size labeling

## Testing Requirements

- [ ] Main CI passes on all Node versions
- [ ] Lint job passes
- [ ] Test job passes
- [ ] Coverage is generated and uploaded
- [ ] Docs build successfully
- [ ] Publish workflow validated (dry-run if possible)

## Success Criteria

- [ ] All workflows use actions v4
- [ ] Caching is enabled and working
- [ ] Workflows run faster (measure before/after)
- [ ] No `--legacy-peer-deps` used
- [ ] Coverage artifacts available
- [ ] All jobs pass
- [ ] Documentation updated

## Configuration Examples

### Updated NodeCI.yml Structure

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"
      - name: Install Dependencies
        run: npm ci
      - name: Lint
        run: npm run lint

  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x, 22.x]
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: "npm"
      - name: Install Dependencies
        run: npm ci
      - name: Test
        run: npm test
      - name: Upload Coverage
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: coverage-${{ matrix.node-version }}
          path: coverage/

  test-stylelint-versions:
    name: "Test with Stylelint ${{ matrix.stylelint }}"
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [20.x]
        stylelint: ["14", "15", "16"]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: "npm"
      - name: Install with Stylelint ${{ matrix.stylelint }}
        run: |
          npm i -D stylelint@${{ matrix.stylelint }}
          npm ci
      - name: Test
        run: npm test
```

### Dependabot Configuration (.github/dependabot.yml)

```yaml
version: 2
updates:
  # npm dependencies
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    groups:
      dev-dependencies:
        patterns:
          - "eslint*"
          - "prettier"
          - "@types/*"

  # GitHub Actions
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
```

## Performance Improvements

Expected improvements from caching:

**Before** (no cache):

- Lint job: ~2-3 minutes
- Test job: ~3-4 minutes per Node version
- Total: ~12-15 minutes

**After** (with cache):

- Lint job: ~30-60 seconds
- Test job: ~1-2 minutes per Node version
- Total: ~4-7 minutes

**Savings**: ~60% faster CI

## Rollback Plan

If workflows fail:

1. Revert workflow files to previous version
2. Investigate specific failure
3. Fix incrementally
4. Re-deploy

Workflows are versioned in Git, so rollback is simple.

## Notes

### GitHub Actions Caching

Cache key is based on:

- Operating system
- `package-lock.json` hash

Cache is automatically invalidated when dependencies change.

### Concurrency Groups

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

This cancels previous runs when new commits are pushed, saving resources.

### Artifact Retention

Coverage artifacts are kept for 90 days by default. Can be adjusted:

```yaml
- uses: actions/upload-artifact@v4
  with:
    retention-days: 30
```

## Files to Update

- `/.github/workflows/NodeCI.yml` - Main CI workflow
- `/.github/workflows/GHPages.yml` - Docs deployment
- `/.github/workflows/NpmPublish.yml` - Package publishing
- `/.github/dependabot.yml` - New file (optional)
- `/README.md` - Update CI badge if needed

## Related Issues

- #001 - Node.js Update (simplifies matrix)
- #002 - Dependency Updates (removes legacy flags)
- #004 - Vitest Migration (will update test commands)

## Next Steps After Completion

Once this issue is complete:

1. Move to Phase 2 (#004 - Vitest Migration)
2. Monitor CI performance improvements
3. Consider additional automation (Dependabot, etc.)
4. Phase 1 complete! 🎉
