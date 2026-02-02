# 010: Build Configuration

**Status**: 🔴 Not Started  
**Priority**: Medium  
**Phase**: 3 (TypeScript Migration)  
**Estimated Effort**: 1 day  
**Dependencies**: #009 (Rules Migration)

## Description

Finalize TypeScript build configuration for production, including pre-commit hooks, publishing workflow, and package structure validation.

## Current State

- TypeScript builds to `lib/`
- Basic build scripts
- No pre-commit hooks
- Manual build before publish

## Target State

- Optimized build configuration
- Pre-commit type checking
- Automated build on publish
- Validated package structure
- Production-ready

## Tasks Checklist

### Build Optimization

- [ ] Optimize tsconfig for production
- [ ] Configure incremental builds
- [ ] Add build caching
- [ ] Minimize build time

### Pre-commit Hooks

- [ ] Install husky:
  ```bash
  npm install -D husky lint-staged
  ```
- [ ] Configure pre-commit type checking
- [ ] Run linting before commit
- [ ] Run tests on commit (optional)

### Publishing Workflow

- [ ] Ensure `prepublishOnly` builds
- [ ] Test package contents: `npm pack`
- [ ] Verify .d.ts files included
- [ ] Test package installation locally
- [ ] Update version bump workflow

### Documentation

- [ ] Update README with TypeScript info
- [ ] Document build process
- [ ] Update CONTRIBUTING.md
- [ ] Add type usage examples

## Testing Requirements

- [ ] Clean build works
- [ ] Published package structure correct
- [ ] Type definitions usable
- [ ] No missing files
- [ ] Pre-commit hooks functional

## Success Criteria

- [ ] Build optimized
- [ ] Pre-commit hooks working
- [ ] Package publishable
- [ ] Documentation complete
- [ ] **Phase 3 complete!** 🎉

## Related Issues

- #009 - Rules Migration (prerequisite)
- #011 - ESM Migration (Phase 4, optional)

## Next Steps After Completion

**Phase 3 complete!**

Options:

1. Release v2.0.0 (Node 18+, TypeScript)
2. Move to Phase 4 (#011 - ESM Migration)
3. Use the modernized codebase
