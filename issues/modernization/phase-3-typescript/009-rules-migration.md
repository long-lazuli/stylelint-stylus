# 009: Rules Migration to TypeScript

**Status**: 🔴 Not Started  
**Priority**: High  
**Phase**: 3 (TypeScript Migration)  
**Estimated Effort**: 4-5 days  
**Dependencies**: #008 (Utils Migration)

## Description

Migrate all 34 Stylelint rules from JavaScript to TypeScript. This is the largest and most critical part of the TypeScript migration.

## Current State

- 34 rules in `lib/rules/` (JavaScript)
- Rules work but no type safety
- Some JSDoc comments
- Complex rule logic

## Target State

- All 34 rules in `src/rules/` (TypeScript)
- Full type coverage
- Type-safe rule implementations
- Improved maintainability
- Compiled to `lib/rules/`

## Stylus Documentation References

Each rule must validate against Stylus spec:

- https://stylus-lang.com/docs/ (all relevant sections per rule)

## Migration Strategy

**Incremental approach**: Migrate 2-3 rules per day, test after each.

**Order**: Simple → Complex

1. Simple formatting rules (10 rules)
2. Whitespace/spacing rules (19 rules)
3. Complex validation rules (5 rules)

## Tasks Checklist

### Simple Rules (Day 1)

- [ ] `at-extend-style.ts`
- [ ] `color-hex-case.ts`
- [ ] `declaration-colon.ts`
- [ ] `hash-object-property-comma.ts`
- [ ] `media-feature-colon.ts`
- [ ] `no-at-require.ts`
- [ ] `pythonic.ts`
- [ ] `selector-pseudo-class.ts`
- [ ] `semicolon.ts`
- [ ] `single-line-comment.ts`

### Whitespace Rules (Day 2-3)

- [ ] All 19 block/selector spacing rules
- [ ] Comment spacing rules
- [ ] Number formatting rules

### Complex Rules (Day 4)

- [ ] `at-rule-no-unknown.ts`
- [ ] `property-no-unknown.ts`
- [ ] `selector-type-no-unknown.ts`
- [ ] `indentation.ts`

### Finalization (Day 5)

- [ ] `src/rules/index.ts` - export all rules
- [ ] `src/index.ts` - main entry point
- [ ] Update all imports
- [ ] Remove old JavaScript files
- [ ] Full build and test

## Testing Requirements

- [ ] Each rule's tests pass after migration
- [ ] All 315 fixtures still pass
- [ ] Integration tests pass
- [ ] Type checking passes
- [ ] Build successful

## Success Criteria

- [ ] All 34 rules migrated
- [ ] All tests pass
- [ ] Type coverage 100%
- [ ] Build successful
- [ ] **TypeScript migration complete!**

## Related Issues

- #008 - Utils Migration (prerequisite)
- #010 - Build Config (next step)

## Next Steps After Completion

Move to #010 (Build Configuration)
