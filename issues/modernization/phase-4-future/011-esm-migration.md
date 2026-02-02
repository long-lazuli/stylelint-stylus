# 011: ESM Migration

**Status**: 🔴 Not Started  
**Priority**: Low  
**Phase**: 4 (Future Enhancements)  
**Estimated Effort**: 3-4 days  
**Dependencies**: #010 (Build Config)

## Description

Migrate from CommonJS to ES Modules (ESM), providing dual package support (CJS + ESM) for maximum compatibility.

## Current State

- Module system: CommonJS
- `require()`/`module.exports`
- Compatible with all Node.js versions
- Works with most bundlers

## Target State

- Dual package: ESM + CJS
- ESM as primary export
- CJS as fallback
- Full compatibility
- Modern module system

## Benefits

- Better tree-shaking
- Modern standard
- Smaller bundles
- Better static analysis
- Future-proof

## **Breaking Changes**

This is a **BREAKING CHANGE** requiring v3.0.0

- Requires `"type": "module"` in package.json
- Changes import/export syntax
- May break some consumers
- Requires coordination with Stylelint community

## Tasks Checklist

### Research

- [ ] Research dual package best practices
- [ ] Check Stylelint ESM support
- [ ] Survey ecosystem compatibility
- [ ] Plan breaking change communication

### TypeScript Configuration

- [ ] Update tsconfig for ESM output
- [ ] Create separate tsconfig for CJS
- [ ] Configure dual builds
- [ ] Add `.js` extensions to imports

### Package.json Updates

- [ ] Add `"type": "module"`
- [ ] Configure exports field:
  ```json
  {
    "exports": {
      ".": {
        "import": "./lib/esm/index.js",
        "require": "./lib/cjs/index.js"
      }
    }
  }
  ```
- [ ] Update build scripts for dual output

### Migration

- [ ] Convert all imports to ESM syntax
- [ ] Add `.js` extensions to relative imports
- [ ] Update dynamic imports
- [ ] Test with both ESM and CJS consumers

### Testing

- [ ] Test ESM imports
- [ ] Test CJS requires
- [ ] Test with bundlers (Webpack, Vite, etc.)
- [ ] Ensure backward compatibility

### Documentation

- [ ] Document breaking changes
- [ ] Update migration guide
- [ ] Coordinate with Stylelint team
- [ ] Announce v3.0.0

## Testing Requirements

- [ ] Works with ESM consumers
- [ ] Works with CJS consumers
- [ ] All tests pass in both modes
- [ ] No regressions

## Success Criteria

- [ ] Dual package working
- [ ] All tests pass
- [ ] Documentation complete
- [ ] v3.0.0 ready

## Notes

**Optional**: This phase can be skipped if ESM support isn't critical. CommonJS still works perfectly fine.

**Coordination**: Check with Stylelint community before proceeding.

## Related Issues

- #010 - Build Config (prerequisite)

## Next Steps After Completion

**All modernization complete!** 🎉🎉🎉

Consider:

- Ongoing maintenance
- Community feedback
- New features
- Performance optimization
