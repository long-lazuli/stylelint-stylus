# 008: Utils Migration to TypeScript

**Status**: 🔴 Not Started  
**Priority**: High  
**Phase**: 3 (TypeScript Migration)  
**Estimated Effort**: 2-3 days  
**Dependencies**: #007 (TypeScript Setup)

## Description

Migrate all utility files from `lib/utils/` to TypeScript in `src/utils/`. This includes type definitions, helper functions, and shared code used across rules.

## Current State

- Utilities in `lib/utils/` (JavaScript)
- No type safety
- JSDoc comments in some files
- Shared code for all rules

## Target State

- All utilities in `src/utils/` (TypeScript)
- Proper type definitions
- Type guards for runtime checks
- Full type coverage
- Compiled to `lib/utils/`

## Stylus Documentation References

Utilities handle Stylus-specific logic, reference:

- https://stylus-lang.com/docs/selectors (selector parsing)
- https://stylus-lang.com/docs/comments (comment detection)
- Other relevant Stylus features

## Migration Order

Migrate from least to most dependent:

1. Type definitions (`src/types/`)
2. Simple utilities (no dependencies)
3. Complex utilities (depend on simple ones)
4. Rule base classes/helpers

## Tasks Checklist

### Part 1: Create Type Definitions

- [ ] `src/types/stylelint.ts` - Stylelint types
- [ ] `src/types/stylus.ts` - Stylus AST types
- [ ] `src/types/postcss.ts` - PostCSS types
- [ ] `src/types/rules.ts` - Rule interfaces
- [ ] Import and extend official types where available

### Part 2: Migrate Simple Utilities

- [ ] `get-stylus-source.js` → `get-stylus-source.ts`
- [ ] `is-*.js` files → type guards
- [ ] `style-search.js` → `style-search.ts`
- [ ] String manipulation utilities
- [ ] Validation functions

### Part 3: Migrate Complex Utilities

- [ ] Selector parsing utilities
- [ ] Comment handling utilities
- [ ] AST traversal helpers
- [ ] Stylelint integration utilities
- [ ] Version compatibility helpers

### Part 4: Update Imports

- [ ] Update all imports to use new TypeScript paths
- [ ] Test that build works
- [ ] Verify all rules can import utilities

### Part 5: Remove Old Files

- [ ] Delete JavaScript utilities from `lib/utils/`
- [ ] Keep generated files after build
- [ ] Update .gitignore if needed

## Testing Requirements

- [ ] All tests pass with new TypeScript utilities
- [ ] Build completes without errors
- [ ] Type checking passes
- [ ] No runtime errors

## Success Criteria

- [ ] All utilities migrated to TypeScript
- [ ] Type definitions complete
- [ ] All tests pass
- [ ] Build successful
- [ ] Ready for rules migration

## Related Issues

- #007 - TypeScript Setup (prerequisite)
- #009 - Rules Migration (next step)

## Next Steps After Completion

Move to #009 (Rules Migration)
