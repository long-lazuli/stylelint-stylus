# 005: Integration Tests

**Status**: 🔴 Not Started  
**Priority**: High  
**Phase**: 2 (Testing Infrastructure)  
**Estimated Effort**: 2-3 days  
**Dependencies**: #004 (Vitest Migration)

## Description

Add comprehensive integration tests that validate stylelint-stylus against real-world Stylus files and all major Stylus language features. Current tests are mostly unit tests on isolated fixtures.

## Current State

**Existing Integration Tests**:

- 2 integration tests for Stylelint v13/v14 compatibility
- 315 fixture-based unit tests
- No tests with real-world Stylus projects
- Limited edge case coverage

**Missing Coverage**:

- Real Stylus projects (Bootstrap Stylus, Nib, etc.)
- Complex multi-file projects
- All selector types from Stylus docs
- Mixed syntax styles (pythonic + CSS)
- Edge cases and unusual but valid Stylus

## Target State

**New Test Structure**:

```
tests/integration/
├── real-world/
│   ├── bootstrap-stylus.test.ts
│   ├── nib-integration.test.ts
│   └── complex-project.test.ts
├── stylus-features/
│   ├── selectors.test.ts
│   ├── comments.test.ts
│   ├── at-rules.test.ts
│   ├── variables.test.ts
│   ├── mixins.test.ts
│   ├── functions.test.ts
│   ├── conditionals.test.ts
│   ├── iteration.test.ts
│   ├── hashes.test.ts
│   ├── mixed-syntax.test.ts
│   └── edge-cases.test.ts
└── fixtures/
    └── [Real Stylus files]
```

## Stylus Documentation References

**Must Test All Major Features**:

### Selectors

- https://stylus-lang.com/docs/selectors
  - Indentation (pythonic style)
  - Parent reference (`&`)
  - Partial reference (`^[N]`, `^[N..M]`)
  - Initial reference (`~/`)
  - Relative reference (`../`)
  - Root reference (`/`)
  - `selector()` and `selectors()` BIFs

### Comments

- https://stylus-lang.com/docs/comments
  - Single-line (`//`)
  - Multi-line (`/* */`)
  - Multi-line buffered (`/*! */`)

### Variables & Interpolation

- https://stylus-lang.com/docs/variables
- https://stylus-lang.com/docs/interpolation

### Operators

- https://stylus-lang.com/docs/operators
  - Arithmetic, comparison, logical
  - Range operator (`..`)
  - Color operations

### Mixins & Functions

- https://stylus-lang.com/docs/mixins
- https://stylus-lang.com/docs/functions
- https://stylus-lang.com/docs/kwargs (keyword arguments)
- https://stylus-lang.com/docs/vargs (rest parameters)

### Control Flow

- https://stylus-lang.com/docs/conditionals
- https://stylus-lang.com/docs/iteration

### At-Rules

- https://stylus-lang.com/docs/import (`@import`, `@require`)
- https://stylus-lang.com/docs/media (`@media`)
- https://stylus-lang.com/docs/extend (`@extend`, `@extends`)
- https://stylus-lang.com/docs/keyframes (`@keyframes`)
- https://stylus-lang.com/docs/font-face (`@font-face`)
- https://stylus-lang.com/docs/block (`@block`)

### Special Features

- https://stylus-lang.com/docs/literal (CSS literal)
- https://stylus-lang.com/docs/css-style (CSS-style syntax)
- https://stylus-lang.com/docs/hashes (Hash objects)
- https://stylus-lang.com/docs/escape (Character escaping)

## Tasks Checklist

### Part 1: Setup

- [ ] Create `tests/integration/` directory structure
- [ ] Create `tests/integration/fixtures/` for test files
- [ ] Set up integration test utilities (if needed)

### Part 2: Real-World Project Tests

- [ ] Find/download Bootstrap Stylus source
  - [ ] Create test that lints Bootstrap Stylus
  - [ ] Verify no false positives
  - [ ] Document any expected warnings
- [ ] Find/download Nib library source
  - [ ] Create test that lints Nib
  - [ ] Verify mixin definitions work
  - [ ] Verify vendor prefixes handled correctly
- [ ] Create complex multi-file project test
  - [ ] Test with `@import` statements
  - [ ] Test with variables across files
  - [ ] Test with mixins in separate files

### Part 3: Selectors (tests/integration/stylus-features/selectors.test.ts)

Test all selector types from https://stylus-lang.com/docs/selectors:

- [ ] Indentation / pythonic style
- [ ] Parent reference (`&`)
  ```stylus
  .button
    &:hover
      color red
  ```
- [ ] Partial reference (`^[0]`, `^[1]`, `^[-1]`)
  ```stylus
  .foo
    &__bar
      ^[0]:hover &
        color red
  ```
- [ ] Partial reference ranges (`^[N..M]`)
  ```stylus
  .foo
    & .bar
      ^[1..-1]
        color red
  ```
- [ ] Initial reference (`~/`)
  ```stylus
  .block
    &__element
      ~/:hover &
        color red
  ```
- [ ] Relative reference (`../`)
  ```stylus
  .foo
    .bar
      ../ .baz
        color red
  ```
- [ ] Root reference (`/`)
  ```stylus
  .foo
    .bar
      /.global
        color red
  ```
- [ ] `selector()` BIF
- [ ] `selectors()` BIF

### Part 4: Comments (tests/integration/stylus-features/comments.test.ts)

- [ ] Single-line comments (`//`)
- [ ] Multi-line comments (`/* */`)
- [ ] Buffered comments (`/*! */`)
- [ ] Comments in various positions (before/after/inline)
- [ ] Empty comments
- [ ] Comments with special characters

### Part 5: At-Rules (tests/integration/stylus-features/at-rules.test.ts)

- [ ] `@import` with `.styl` files
- [ ] `@require` (deprecated, should warn if using no-at-require rule)
- [ ] `@media` queries
  - Standard media queries
  - With variables
  - Nested media queries
- [ ] `@extend` / `@extends`
  - Simple extends
  - Multiple extends
  - Placeholder selectors
- [ ] `@keyframes`
- [ ] `@font-face`
- [ ] `@block`
- [ ] Custom at-rules (should work or error appropriately)

### Part 6: Variables & Interpolation

- [ ] Variable declarations
- [ ] Variable usage
- [ ] Interpolation in selectors `{$var}`
- [ ] Interpolation in properties
- [ ] Interpolation in values

### Part 7: Mixins & Functions

- [ ] Mixin definitions and calls
- [ ] Transparent mixins
- [ ] Functions with return values
- [ ] Built-in functions (sample)
- [ ] Keyword arguments
- [ ] Rest parameters

### Part 8: Control Flow

- [ ] `if`/`else` conditionals
- [ ] `unless` conditionals
- [ ] `for` loops
- [ ] `for..in` loops
- [ ] `return` statements

### Part 9: Hashes

- [ ] Hash object syntax
- [ ] Hash property access
- [ ] Hash in function arguments

### Part 10: Mixed Syntax Styles

- [ ] Pythonic (no braces, no semicolons, no colons)
  ```stylus
  body
    color red
    padding 10px
  ```
- [ ] CSS-style (with braces, semicolons, colons)
  ```stylus
  body {
    color: red;
    padding: 10px;
  }
  ```
- [ ] Mixed (both styles in same file)

  ```stylus
  body
    color red

  .button {
    padding: 10px;
  }
  ```

### Part 11: Edge Cases

- [ ] Empty files
- [ ] Files with only comments
- [ ] Very long selectors
- [ ] Deeply nested selectors (10+ levels)
- [ ] Unicode in selectors/properties
- [ ] Escaped characters
- [ ] CSS literals (`@css { ... }`)
- [ ] Invalid Stylus (should error gracefully)

### Part 12: Documentation

- [ ] Document integration test structure in README
- [ ] Add examples of running integration tests
- [ ] Document how to add new integration tests
- [ ] Link to Stylus docs from test descriptions

## Testing Requirements

- [ ] All integration tests pass
- [ ] Tests cover all major Stylus features
- [ ] Real-world projects lint without false positives
- [ ] Edge cases handled gracefully
- [ ] Tests reference Stylus documentation
- [ ] Coverage improved (new code paths exercised)

## Success Criteria

- [ ] 20+ integration test files created
- [ ] All Stylus features from docs tested
- [ ] At least 2 real-world projects tested
- [ ] Edge cases covered
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Stylus spec compliance validated

## Test Template

```typescript
import { describe, it, expect } from "vitest";
import stylelint from "stylelint";
import path from "path";

describe("Integration: Stylus Selectors", () => {
  it("should handle parent reference (&)", async () => {
    // Reference: https://stylus-lang.com/docs/selectors#parent-reference

    const result = await stylelint.lint({
      code: `
        .button
          color blue
          &:hover
            color red
      `,
      config: {
        extends: ["stylelint-stylus/standard"],
      },
      customSyntax: "postcss-styl",
    });

    expect(result.errored).toBe(false);
    expect(result.results[0].warnings).toHaveLength(0);
  });

  // More tests...
});
```

## Notes

### Finding Real-World Stylus Projects

Sources:

- **Bootstrap Stylus**: https://github.com/maxmx/bootstrap-stylus
- **Nib**: https://github.com/stylus/nib
- **Jeet Grid**: https://github.com/mojotech/jeet
- **Rupture**: https://github.com/jescalan/rupture
- Search GitHub for popular `.styl` files

### Handling False Positives

If real-world projects trigger warnings:

1. Verify warning is correct per Stylus spec
2. If incorrect, file as bug
3. If correct, document as expected behavior
4. Consider adding auto-fix if applicable

### Performance Considerations

Integration tests may be slower than unit tests:

- Use `describe.concurrent()` for parallel execution
- Cache parsed Stylus files if beneficial
- Set reasonable timeouts

## Related Issues

- #004 - Vitest Migration (provides test framework)
- #006 - Coverage Thresholds (integration tests improve coverage)
- Phase 3 - TypeScript (integration tests will validate types)

## Next Steps After Completion

Once this issue is complete:

1. Move to #006 (Coverage Thresholds)
2. Use integration tests to validate new features
3. Add integration tests for bug reports
4. Consider adding to CI as separate job
