# 004: Vitest Migration

**Status**: 🔴 Not Started  
**Priority**: High  
**Phase**: 2 (Testing Infrastructure)  
**Estimated Effort**: 4-5 days  
**Dependencies**: #001 (Node.js Update), #002 (Dependency Updates)

## Description

Migrate the test suite from Mocha + NYC to Vitest for modern, fast testing with built-in coverage. This is a significant refactor involving custom test utilities and 315 fixture-based tests across 37 test files.

## Current State

**Test Framework**: Mocha v9 with custom wrapper utilities  
**Coverage**: NYC (Istanbul) v15  
**Test Files**: 37 test runner files  
**Fixtures**: 315 fixture sets (input/output/warnings.json)  
**Custom Utilities**: `tests/utils/tester.js` (251 lines), `tests/utils/index.js` (131 lines)

**Key Patterns**:

- `ruleTester(ruleName, dir)` - Generates tests from fixtures
- `fixturesTester(dir, options)` - For config/integration tests
- Dual parser testing (custom syntax + raw parser)
- Fixture update mechanism (`UPDATE_FIXTURES=true`)
- Dynamic test generation from directory structure

## Target State

**Test Framework**: Vitest v4.x  
**Coverage**: Vitest's v8 coverage provider  
**Test Files**: Same 37 files, migrated to `.test.ts`  
**Fixtures**: Same fixtures, updated if Vitest finds different issues  
**Custom Utilities**: Rewritten for Vitest compatibility

**Benefits**:

- 10-20x faster test execution
- Modern, better DX
- Built-in coverage (no separate tool)
- Better error messages
- TypeScript support ready
- Watch mode with HMR
- UI mode for debugging

## Stylus Documentation References

- https://stylus-lang.com/docs/selectors (for selector rule tests)
- https://stylus-lang.com/docs/comments (for comment rule tests)
- All relevant Stylus docs for validation during migration

## Migration Strategy

### Phase 1: Setup (Day 1)

1. Install Vitest alongside Mocha (parallel installation)
2. Create `vitest.config.ts`
3. Keep Mocha tests running during migration
4. Establish parallel test scripts

### Phase 2: Utility Rewrite (Day 1-2)

1. Create `tests/utils/tester.vitest.ts`
2. Rewrite `ruleTester()` for Vitest
3. Rewrite `fixturesTester()` for Vitest
4. Preserve all existing functionality
5. Handle UPDATE_FIXTURES workflow

### Phase 3: POC Migration (Day 2)

1. Pick simple rule (`semicolon`)
2. Create `.test.ts` version alongside `.js` version
3. Verify all fixtures work
4. Test autofix functionality
5. Validate approach

### Phase 4: Batch Migration (Day 3-4)

1. Migrate all 34 rule tests
2. Migrate standard config tests
3. Migrate integration tests
4. Update test commands

### Phase 5: Cleanup (Day 5)

1. Remove Mocha and NYC
2. Delete old test files
3. Update CI workflows
4. Final validation

## Tasks Checklist

### Part 1: Installation & Setup

- [ ] Install Vitest dependencies:
  ```bash
  npm install -D vitest @vitest/coverage-v8 @vitest/ui
  ```
- [ ] Create `vitest.config.ts` (see config below)
- [ ] Add Vitest scripts to package.json:
  ```json
  {
    "test:vitest": "vitest",
    "test:mocha": "mocha \"tests/runs/**/*.js\" --reporter dot --timeout 60000",
    "test": "npm run test:mocha",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "update-fixtures": "UPDATE_FIXTURES=true vitest"
  }
  ```
- [ ] Verify Vitest runs (even with no tests yet)

### Part 2: Rewrite Test Utilities

**Create `tests/utils/tester.vitest.ts`:**

- [ ] Import Vitest APIs (`describe`, `it`, `expect`, `beforeAll`, `afterAll`)
- [ ] Rewrite `ruleTester()`:
  - [ ] Accept same parameters: `ruleTester(ruleName, dir)`
  - [ ] Use `listupFixtures()` to discover fixtures (keep from old utils)
  - [ ] Use `describe.each()` or nested `describe()` for dynamic tests
  - [ ] Generate `it('lint')` test for each fixture
  - [ ] Generate `it('autofix')` test for fixable rules
  - [ ] Test with both custom syntax and raw parsers
  - [ ] Compare warnings against `warnings.json`
  - [ ] Compare output against `output.*` files
- [ ] Rewrite `fixturesTester()`:
  - [ ] Similar approach but without rule-specific assertions
  - [ ] Used for standard config and integration tests
- [ ] Handle `UPDATE_FIXTURES` environment variable:
  ```typescript
  if (process.env.UPDATE_FIXTURES === "true") {
    // Write warnings.json
    // Write output files
  } else {
    // Compare against expected
  }
  ```
- [ ] Preserve all assertion logic from Mocha version

**Update `tests/utils/index.js`:**

- [ ] Keep `listupFixtures()` as-is (framework-agnostic)
- [ ] Export Vitest version of utilities
- [ ] Ensure `updateFixture()` works with Vitest

### Part 3: POC - Migrate One Rule

Pick `semicolon` rule for proof of concept:

- [ ] Create `tests/runs/lib/rules/semicolon.test.ts`
- [ ] Import Vitest tester utilities
- [ ] Use `ruleTester('stylus/semicolon', __dirname + '/../../../fixtures/lib/rules/semicolon')`
- [ ] Run: `npm run test:vitest semicolon`
- [ ] Verify all fixtures pass
- [ ] Test UPDATE_FIXTURES: `UPDATE_FIXTURES=true npm run test:vitest semicolon`
- [ ] Compare with Mocha results to ensure parity
- [ ] Fix any discrepancies

### Part 4: Migrate All Rule Tests

**34 Rules to Migrate** (in this order - simple to complex):

**Simple rules (do first):**

1. - [ ] `at-extend-style.test.ts`
2. - [ ] `color-hex-case.test.ts`
3. - [ ] `declaration-colon.test.ts`
4. - [ ] `hash-object-property-comma.test.ts`
5. - [ ] `media-feature-colon.test.ts`
6. - [ ] `no-at-require.test.ts`
7. - [ ] `pythonic.test.ts`
8. - [ ] `selector-pseudo-class-case.test.ts`
9. - [ ] `semicolon.test.ts` (already done in POC)
10. - [ ] `single-line-comment.test.ts`
11. - [ ] `single-line-comment-double-slash-space-after.test.ts`
12. - [ ] `single-line-comment-no-empty.test.ts`
13. - [ ] `number-leading-zero.test.ts`
14. - [ ] `number-no-trailing-zeros.test.ts`

**Whitespace/formatting rules:** 15. - [ ] `at-rule-empty-line-before.test.ts` 16. - [ ] `at-rule-name-space-after.test.ts` 17. - [ ] `block-closing-brace-empty-line-before.test.ts` 18. - [ ] `block-closing-brace-newline-after.test.ts` 19. - [ ] `block-closing-brace-newline-before.test.ts` 20. - [ ] `block-closing-brace-space-after.test.ts` 21. - [ ] `block-closing-brace-space-before.test.ts` 22. - [ ] `block-opening-brace-newline-after.test.ts` 23. - [ ] `block-opening-brace-space-after.test.ts` 24. - [ ] `block-opening-brace-space-before.test.ts` 25. - [ ] `selector-list-comma.test.ts` 26. - [ ] `selector-list-comma-newline-after.test.ts` 27. - [ ] `selector-list-comma-newline-before.test.ts` 28. - [ ] `selector-list-comma-space-after.test.ts` 29. - [ ] `selector-list-comma-space-before.test.ts` 30. - [ ] `no-eol-whitespace.test.ts`

**Complex rules:** 31. - [ ] `indentation.test.ts` 32. - [ ] `at-rule-no-unknown.test.ts` 33. - [ ] `property-no-unknown.test.ts` 34. - [ ] `selector-type-no-unknown.test.ts`

### Part 5: Migrate Config/Integration Tests

- [ ] `tests/runs/standard/standard.test.ts`
- [ ] `tests/runs/integrations/stylelint-v13.test.ts` (update hooks)
- [ ] `tests/runs/integrations/stylelint-v14.test.ts` (update hooks)

**Note**: Integration tests use `beforeAll`/`afterAll` instead of `before`/`after`

### Part 6: Update Package Scripts

- [ ] Change `"test"` script to use Vitest:
  ```json
  {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "update-fixtures": "UPDATE_FIXTURES=true vitest"
  }
  ```
- [ ] Remove Mocha-specific scripts
- [ ] Update CI workflows to use Vitest

### Part 7: Cleanup

- [ ] Remove Mocha and NYC dependencies:
  ```bash
  npm uninstall mocha nyc
  ```
- [ ] Delete old `.js` test files (keep only `.test.ts`)
- [ ] Delete `tests/utils/tester.js` (keep only Vitest version)
- [ ] Remove `.mocharc.json` or `.mocharc.js` if exists
- [ ] Update `.gitignore` for Vitest coverage output

### Part 8: Final Validation

- [ ] Run full test suite: `npm test`
- [ ] Run with coverage: `npm run test:coverage`
- [ ] Verify coverage thresholds met (80%)
- [ ] Test UPDATE_FIXTURES workflow
- [ ] Run on all Node versions (18, 20, 22)
- [ ] Verify CI passes

## Vitest Configuration

**vitest.config.ts:**

```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Explicit imports (no globals)
    globals: false,

    // Node environment (not browser)
    environment: "node",

    // Test file pattern
    include: ["tests/runs/**/*.test.{js,ts}"],
    exclude: ["**/node_modules/**", "**/dist/**", "**/*.old.js"],

    // Timeout (match Mocha's 60s)
    testTimeout: 60000,

    // Coverage configuration
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov", "json"],

      // Include patterns
      include: [
        "lib/**/*.{js,ts}",
        "custom-syntax/**/*.{js,ts}",
        "base-config/**/*.{js,ts}",
      ],

      // Exclude patterns
      exclude: [
        "lib/utils/stylelint-v15/**", // Legacy compatibility code
        "scripts/**",
        "docs/**",
        "tests/**",
        "**/*.config.{js,ts}",
        "**/node_modules/**",
      ],

      // Thresholds (80% for all)
      thresholds: {
        lines: 80,
        branches: 80,
        functions: 80,
        statements: 80,
      },
    },

    // Reporter options
    reporters: ["default"],

    // Update snapshots (for UPDATE_FIXTURES)
    // Controlled via CLI: vitest -u
  },
});
```

## Mocha → Vitest API Mapping

| Mocha            | Vitest               | Notes              |
| ---------------- | -------------------- | ------------------ |
| `describe()`     | `describe()`         | Same               |
| `it()`           | `it()`               | Same               |
| `before()`       | `beforeAll()`        | Different name     |
| `after()`        | `afterAll()`         | Different name     |
| `beforeEach()`   | `beforeEach()`       | Same               |
| `afterEach()`    | `afterEach()`        | Same               |
| `assert.*`       | `expect().*`         | Different API      |
| `this.timeout()` | Pass timeout to test | Different approach |

## Testing Requirements

- [ ] All 315 fixture tests pass
- [ ] Autofix tests work correctly
- [ ] Dual parser tests work (custom + raw)
- [ ] UPDATE_FIXTURES mechanism works
- [ ] Integration tests pass
- [ ] Coverage meets 80% threshold
- [ ] Tests run faster than Mocha
- [ ] Watch mode works
- [ ] UI mode works

## Success Criteria

- [ ] Vitest fully replaces Mocha
- [ ] All fixtures migrate successfully
- [ ] Coverage ≥ 80% on all metrics
- [ ] Tests run in < 30 seconds (vs ~60s with Mocha)
- [ ] UPDATE_FIXTURES workflow functional
- [ ] CI uses Vitest
- [ ] Documentation updated
- [ ] No Mocha dependencies remain

## Rollback Plan

If major issues discovered:

1. Revert package.json scripts to use Mocha
2. Revert package.json dependencies (reinstall Mocha/NYC)
3. Keep Vitest installed for gradual migration
4. Investigate and fix issues
5. Re-attempt migration

Since we keep both frameworks during migration, rollback is low-risk.

## Performance Expectations

**Current (Mocha + NYC):**

- Test execution: ~30-40 seconds
- Coverage generation: ~20-30 seconds
- Total: ~50-70 seconds

**Target (Vitest):**

- Test execution: ~10-15 seconds
- Coverage generation: ~5-10 seconds
- Total: ~15-25 seconds

**Expected improvement: 3-4x faster**

## Notes

### Custom Test Utilities Deep Dive

**Current `ruleTester()` logic:**

1. Discover fixtures with `listupFixtures(dir)`
2. For each fixture:
   - Create `describe(fixture.name)`
   - Test with custom syntax parser
   - Test with raw parser
   - Compare warnings
   - Test autofix if `output.*` exists
   - Verify autofix doesn't create new warnings

**Vitest version must preserve all this logic.**

### Fixture Discovery

The `listupFixtures()` function is framework-agnostic and should work with Vitest as-is:

```typescript
// From tests/utils/index.js
function listupFixtures(dir) {
  const fixtures = [];
  // Recursively find all fixture directories
  // Each fixture has: input.*, warnings.json, optional output.*
  return fixtures;
}
```

### UPDATE_FIXTURES Workflow

**Current Mocha approach:**

```javascript
if (process.env.UPDATE_FIXTURES === "true") {
  fs.writeFileSync("warnings.json", JSON.stringify(warnings, null, 2));
  fs.writeFileSync("output.styl", actualOutput);
}
```

**Vitest approach (same):**

```typescript
if (process.env.UPDATE_FIXTURES === "true") {
  await fs.promises.writeFile(
    "warnings.json",
    JSON.stringify(warnings, null, 2)
  );
  await fs.promises.writeFile("output.styl", actualOutput);
}
```

### Integration Test Updates

**Mocha:**

```javascript
before(() => {
  process.chdir(fixtureDir);
  cp.execSync("npm install --legacy-peer-deps");
});
```

**Vitest:**

```typescript
beforeAll(() => {
  process.chdir(fixtureDir);
  cp.execSync("npm install"); // No legacy flag after #002
});
```

## Files to Update

- `/package.json` - scripts and dependencies
- `/vitest.config.ts` - new file
- `/tests/utils/tester.vitest.ts` - new file (rewritten utilities)
- `/tests/utils/index.js` - update exports
- `/tests/runs/**/*.js` → `*.test.ts` - all test files
- `/.github/workflows/NodeCI.yml` - update test commands
- `/README.md` - update testing section
- `/.gitignore` - Vitest coverage paths

## Related Issues

- #001 - Node.js Update (Vitest requires Node 18+)
- #002 - Dependency Updates (clean dependencies help migration)
- #005 - Integration Tests (new tests will use Vitest)
- #006 - Coverage Thresholds (enforced in Vitest config)

## Next Steps After Completion

Once this issue is complete:

1. Move to #005 (Integration Tests)
2. Enjoy faster test execution!
3. Use Vitest UI for debugging: `npm run test:ui`
4. Consider snapshot testing for complex outputs
