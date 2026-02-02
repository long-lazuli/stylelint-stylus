# 006: Coverage Thresholds

**Status**: 🔴 Not Started  
**Priority**: Medium  
**Phase**: 2 (Testing Infrastructure)  
**Estimated Effort**: 1-2 days  
**Dependencies**: #004 (Vitest Migration), #005 (Integration Tests)

## Description

Enforce minimum code coverage thresholds (80% for lines, branches, functions, statements) and improve coverage by adding tests for uncovered code paths.

## Current State

- Coverage tool: NYC (Istanbul)
- Coverage generated but not enforced
- No minimum thresholds
- Coverage reports available but optional
- Unknown current coverage percentage

## Target State

- Vitest v8 coverage enforced
- Minimum 80% coverage on all metrics
- Coverage enforced in CI (fails on drop below threshold)
- Coverage reports uploaded as artifacts
- Coverage badge in README
- All code paths justified (covered or documented as unreachable)

## Benefits

- Ensures test quality
- Catches untested code
- Prevents coverage regression
- Better code confidence
- Documentation of test completeness

## Stylus Documentation References

N/A (Infrastructure task, but tests should reference Stylus docs)

## Tasks Checklist

### Part 1: Measure Current Coverage

- [ ] Run coverage with Vitest: `npm run test:coverage`
- [ ] Document current coverage percentages:
  ```
  Lines: ___%
  Branches: ___%
  Functions: ___%
  Statements: ___%
  ```
- [ ] Identify files with low coverage
- [ ] Review coverage report HTML
- [ ] Document uncovered code paths

### Part 2: Configure Coverage Thresholds

Already done in #004, but verify:

- [ ] `vitest.config.ts` has thresholds:
  ```typescript
  coverage: {
    thresholds: {
      lines: 80,
      branches: 80,
      functions: 80,
      statements: 80,
    }
  }
  ```
- [ ] Test that failures occur when below threshold

### Part 3: Analyze Coverage Gaps

For each file with <80% coverage:

- [ ] List uncovered files/functions
- [ ] Categorize:
  - **Legitimately uncovered** (error handlers, edge cases)
  - **Should be tested** (normal code paths)
  - **Legacy/deprecated** (can be documented)
- [ ] Create plan to cover testable code

### Part 4: Add Missing Tests

Priority areas (examples):

- [ ] Error handling paths
- [ ] Edge cases in rules
- [ ] Utility functions
- [ ] Selector parsing edge cases
- [ ] Whitespace handling
- [ ] Comment handling
- [ ] Autofix edge cases
- [ ] Version-specific compatibility code

For each gap:

- [ ] Review Stylus documentation for correct behavior
- [ ] Write test case
- [ ] Verify coverage increases
- [ ] Document why code exists (in test description)

### Part 5: Document Uncoverable Code

For code that cannot/should not be covered:

- [ ] Add `/* istanbul ignore next */` or `/* v8 ignore next */`
- [ ] Document why in comment
- [ ] Examples:
  - Defensive error checks that shouldn't happen
  - Type guards for TypeScript (after migration)
  - Fallback code for old Stylelint versions

### Part 6: CI Integration

- [ ] Ensure coverage runs in CI
- [ ] Upload coverage artifacts:
  ```yaml
  - name: Upload Coverage
    uses: actions/upload-artifact@v4
    with:
      name: coverage-report
      path: coverage/
  ```
- [ ] Consider uploading to Codecov/Coveralls (optional)
- [ ] Verify CI fails when coverage drops below 80%

### Part 7: Coverage Badge

- [ ] Generate coverage badge
- [ ] Add to README.md
- [ ] Options:
  - Shields.io with Codecov
  - Simple badge from coverage percentage
  - GitHub Actions badge

### Part 8: Documentation

- [ ] Document coverage requirements in CONTRIBUTING.md (create if needed)
- [ ] Add coverage command to README
- [ ] Document how to view coverage report
- [ ] Explain threshold policy

## Testing Requirements

- [ ] Coverage ≥ 80% on all metrics
- [ ] All new code must maintain coverage
- [ ] CI enforces thresholds
- [ ] Coverage reports accessible
- [ ] Uncovered code justified

## Success Criteria

- [ ] Coverage meets 80% on all metrics
- [ ] Thresholds enforced in CI
- [ ] Coverage badge in README
- [ ] All gaps either covered or documented
- [ ] No false positives (unnecessary tests)
- [ ] Documentation updated

## Coverage Report Example

```bash
# Run coverage
npm run test:coverage

# Output should show:
# ✓ Lines   : 85.23% (target: 80%)
# ✓ Branches: 82.15% (target: 80%)
# ✓ Functions: 88.94% (target: 80%)
# ✓ Statements: 85.23% (target: 80%)

# View HTML report
open coverage/index.html
```

## Common Coverage Gaps

### 1. Error Handlers

```typescript
// Often uncovered - add error case test
try {
  doSomething();
} catch (error) {
  // This path needs a test
  handleError(error);
}
```

### 2. Edge Cases

```typescript
// Add test for null/undefined
if (!value) {
  return defaultValue;
}
```

### 3. Version Compatibility

```typescript
// Test with different Stylelint versions
if (stylelintVersion >= 15) {
  useNewAPI();
} else {
  useLegacyAPI();
}
```

## Notes

### Coverage vs Quality

**Coverage is a metric, not a goal.**

- 80% coverage doesn't mean 100% quality
- Focus on meaningful tests
- Don't write tests just for coverage
- Cover important code paths first
- Edge cases and error handling matter

### V8 Coverage Accuracy

Vitest's V8 coverage is more accurate than Istanbul:

- Reports actual executed code
- Fewer false positives
- May report lower coverage initially (more accurate)

### Maintaining Coverage

Going forward:

- All PRs should maintain or improve coverage
- CI checks coverage on every push
- Review coverage reports in PR reviews
- Add tests for bug fixes (regression prevention)

## Files to Update

- `/vitest.config.ts` - ensure thresholds configured
- `/.github/workflows/NodeCI.yml` - upload coverage artifacts
- `/README.md` - add coverage badge and instructions
- `/CONTRIBUTING.md` - document coverage requirements (create if needed)

## Related Issues

- #004 - Vitest Migration (provides coverage tool)
- #005 - Integration Tests (improves coverage)
- #009 - Rules Migration to TypeScript (may affect coverage)

## Next Steps After Completion

Once this issue is complete:

1. **Phase 2 Complete!** 🎉
2. Move to Phase 3 (#007 - TypeScript Setup)
3. Maintain coverage in all future changes
4. Monitor coverage trends over time
