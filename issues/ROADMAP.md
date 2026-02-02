# Modernization Roadmap

> **Complete modernization plan for stylelint-stylus fork**

## 🎯 Overview

This roadmap outlines a methodical, phased approach to modernize the stylelint-stylus codebase with:

- **Node.js 18+ LTS** (dropping 12, 14, 16)
- **Vitest** for modern, fast testing
- **Full TypeScript** migration
- **Comprehensive integration tests**
- **80% code coverage** enforced

**Development Workflow**: Documentation → Tests → Development

## 📊 Quick Stats

- **Total Issues**: 11 modernization tasks
- **Estimated Duration**: 10-11 weeks
- **Phases**: 4 (3 required + 1 optional)
- **Test Files**: 37 files, 315 fixture sets
- **Rules to Migrate**: 34 Stylelint rules

## 🗺️ Phase Overview

### Phase 1: Foundation (Weeks 1-2) ✅ Prerequisites

**Goal**: Modern Node.js, stable dependencies, improved CI/CD

| Issue | Title                     | Effort   | Status         |
| ----- | ------------------------- | -------- | -------------- |
| #001  | Node.js Update to LTS 18+ | 1-2 days | 🔴 Not Started |
| #002  | Dependency Updates        | 2-3 days | 🔴 Not Started |
| #003  | CI/CD Updates             | 1 day    | 🔴 Not Started |

**Deliverable**: v1.1.0 (Internal improvements, no breaking changes for users)

---

### Phase 2: Testing Infrastructure (Weeks 3-5) 🧪 Quality

**Goal**: Modern, fast testing with Vitest + integration tests

| Issue | Title               | Effort   | Status         |
| ----- | ------------------- | -------- | -------------- |
| #004  | Vitest Migration    | 4-5 days | 🔴 Not Started |
| #005  | Integration Tests   | 2-3 days | 🔴 Not Started |
| #006  | Coverage Thresholds | 1-2 days | 🔴 Not Started |

**Deliverable**: 3-4x faster tests, 80% coverage enforced

---

### Phase 3: TypeScript Migration (Weeks 6-10) 🔷 Type Safety

**Goal**: Full TypeScript for better DX and type safety

| Issue | Title                      | Effort   | Status         |
| ----- | -------------------------- | -------- | -------------- |
| #007  | TypeScript Setup           | 1-2 days | 🔴 Not Started |
| #008  | Utils Migration            | 2-3 days | 🔴 Not Started |
| #009  | Rules Migration (34 rules) | 4-5 days | 🔴 Not Started |
| #010  | Build Configuration        | 1 day    | 🔴 Not Started |

**Deliverable**: v2.0.0 (Breaking: Node 18+ required, Full TypeScript)

---

### Phase 4: Future Enhancements (Week 11+) 🚀 Optional

**Goal**: ESM support (optional, breaking change)

| Issue | Title         | Effort   | Status         |
| ----- | ------------- | -------- | -------------- |
| #011  | ESM Migration | 3-4 days | 🔴 Not Started |

**Deliverable**: v3.0.0 (Breaking: ESM primary export, CJS fallback)

---

## 📅 Detailed Timeline

```
Week 1-2:   Phase 1 - Foundation
            └─ Node 18+, Dependencies, CI

Week 3-5:   Phase 2 - Testing
            ├─ Vitest migration (4-5 days)
            ├─ Integration tests (2-3 days)
            └─ Coverage enforcement (1-2 days)

Week 6-10:  Phase 3 - TypeScript
            ├─ Setup (1-2 days)
            ├─ Utils migration (2-3 days)
            ├─ Rules migration (4-5 days)
            └─ Build config (1 day)

Week 11+:   Phase 4 - ESM (Optional)
            └─ ESM migration (3-4 days)
```

## 🎓 Development Workflow

For every issue, follow this standardized process:

### 1️⃣ Check Documentation

- Review relevant [Stylus documentation](https://stylus-lang.com/docs/)
- Review Stylelint/Vitest/TypeScript docs
- Research best practices
- Document findings

### 2️⃣ Write/Adapt Tests

- Create new test files or update existing
- Follow TDD principles
- Cover edge cases
- Reference Stylus docs in test descriptions

### 3️⃣ Develop

- Implement the feature/fix
- Ensure all tests pass
- Follow code style
- Update documentation

### 4️⃣ Verify

- Run full test suite
- Check coverage hasn't decreased
- Verify Stylus language compliance
- Test with real-world files

## 📚 Stylus Language Compliance

Every change must validate against official Stylus documentation:

| Feature      | Documentation                                                   | Affected Rules         |
| ------------ | --------------------------------------------------------------- | ---------------------- |
| Selectors    | [/docs/selectors](https://stylus-lang.com/docs/selectors)       | selector-\* rules      |
| Comments     | [/docs/comments](https://stylus-lang.com/docs/comments)         | single-line-comment\*  |
| Variables    | [/docs/variables](https://stylus-lang.com/docs/variables)       | property/value rules   |
| Operators    | [/docs/operators](https://stylus-lang.com/docs/operators)       | value parsing          |
| Mixins       | [/docs/mixins](https://stylus-lang.com/docs/mixins)             | function-like features |
| @import      | [/docs/import](https://stylus-lang.com/docs/import)             | at-rule-\*             |
| @media       | [/docs/media](https://stylus-lang.com/docs/media)               | media-feature-\*       |
| @extend      | [/docs/extend](https://stylus-lang.com/docs/extend)             | at-extend-style        |
| @keyframes   | [/docs/keyframes](https://stylus-lang.com/docs/keyframes)       | at-rule-\*             |
| CSS Literal  | [/docs/literal](https://stylus-lang.com/docs/literal)           | parsing edge cases     |
| CSS Style    | [/docs/css-style](https://stylus-lang.com/docs/css-style)       | whitespace rules       |
| Conditionals | [/docs/conditionals](https://stylus-lang.com/docs/conditionals) | control flow           |
| Iteration    | [/docs/iteration](https://stylus-lang.com/docs/iteration)       | loops                  |
| Hashes       | [/docs/hashes](https://stylus-lang.com/docs/hashes)             | hash-object-\*         |

## 🎯 Success Metrics

### Phase 1 (Foundation)

- ✅ CI passes on Node 18, 20, 22
- ✅ All dependencies updated
- ✅ No `npm audit` vulnerabilities
- ✅ No `--legacy-peer-deps` needed
- ✅ CI runs 60% faster (caching)

### Phase 2 (Testing)

- ✅ All 315 fixtures pass in Vitest
- ✅ 20+ integration tests created
- ✅ Tests run 3-4x faster
- ✅ Coverage ≥ 80% enforced
- ✅ UPDATE_FIXTURES workflow works

### Phase 3 (TypeScript)

- ✅ All 34 rules migrated to TypeScript
- ✅ Type checking passes
- ✅ Declaration files generated
- ✅ All tests pass
- ✅ Build successful

### Phase 4 (ESM - Optional)

- ✅ Dual package (ESM + CJS) working
- ✅ Tests pass in both modes
- ✅ No consumer regressions

## 🚀 Version Release Strategy

### v1.1.0 (Post Phase 1)

**Type**: Minor  
**Changes**:

- Node.js 18+ support (non-breaking, still works on older)
- Updated dependencies
- Faster CI

**Release Notes**:

```markdown
## v1.1.0

### Internal Improvements

- Updated dependencies to latest versions
- Improved CI performance with caching
- Added support for Node.js 22

### Note

This version still supports Node.js 12+, but we recommend upgrading to Node.js 18 or later.
```

---

### v2.0.0 (Post Phase 3)

**Type**: Major (BREAKING)  
**Changes**:

- **BREAKING**: Minimum Node.js 18+ required
- Full TypeScript migration
- Vitest testing framework
- 80% test coverage
- Type definitions included

**Migration Guide**:

```markdown
## Migrating to v2.0.0

### Breaking Changes

1. **Node.js 18+ Required**

   - Upgrade Node.js: `nvm install 20`
   - Or stay on v1.x

2. **Type Definitions**
   - Now includes TypeScript definitions
   - Better IDE support

### What's New

- 3-4x faster tests
- Better type safety
- Improved reliability
```

---

### v3.0.0 (Post Phase 4 - Optional)

**Type**: Major (BREAKING)  
**Changes**:

- **BREAKING**: ESM primary export
- CJS still supported (via fallback)
- Requires `"type": "module"` for ESM

**Migration Guide**: Coordinate with Stylelint community

---

## 📁 Project Structure

```
stylelint-stylus/
├── issues/                          # Issue management (NEW)
│   ├── README.md                    # Issue guide
│   ├── ROADMAP.md                   # This file
│   ├── templates/                   # Issue templates
│   ├── modernization/               # Phased modernization
│   │   ├── phase-1-foundation/
│   │   │   ├── 001-nodejs-update.md
│   │   │   ├── 002-dependency-updates.md
│   │   │   └── 003-ci-cd-updates.md
│   │   ├── phase-2-testing/
│   │   │   ├── 004-vitest-migration.md
│   │   │   ├── 005-integration-tests.md
│   │   │   └── 006-coverage-thresholds.md
│   │   ├── phase-3-typescript/
│   │   │   ├── 007-typescript-setup.md
│   │   │   ├── 008-utils-migration.md
│   │   │   ├── 009-rules-migration.md
│   │   │   └── 010-build-config.md
│   │   └── phase-4-future/
│   │       └── 011-esm-migration.md
│   ├── features/                    # Future features
│   ├── bugs/                        # Bug tracking
│   └── documentation/               # Doc improvements
│
├── src/                             # TypeScript source (Phase 3)
│   ├── index.ts
│   ├── types/
│   ├── utils/
│   └── rules/
│
├── lib/                             # Compiled output
├── tests/                           # Test suite
│   ├── runs/                        # Test runners
│   ├── fixtures/                    # 315 fixture sets
│   ├── integration/                 # Integration tests (NEW)
│   └── utils/                       # Test utilities
│
├── docs/                            # Documentation
├── .github/workflows/               # CI/CD
├── vitest.config.ts                 # Vitest config (NEW)
├── tsconfig.json                    # TypeScript config (NEW)
└── package.json
```

## 🔧 Commands Reference

### During Development

```bash
# Testing
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:ui            # UI mode
npm run test:coverage      # With coverage
npm run update-fixtures    # Update test fixtures

# Linting
npm run lint               # Lint code
npm run lint:fix           # Auto-fix issues

# TypeScript (Phase 3+)
npm run build              # Compile TypeScript
npm run build:watch        # Watch mode
npm run type-check         # Check types only

# Development
npm run docs:watch         # Watch docs
npm run docs:build         # Build docs
```

## 📊 Progress Tracking

Track overall progress:

```bash
# Count completed issues
grep -r "🟢 Completed" issues/modernization/ | wc -l

# Count total issues
find issues/modernization -name "*.md" | wc -l

# Progress percentage
# Completed / Total * 100

# List in-progress issues
grep -r "🟡 In Progress" issues/modernization/ -l

# List blocked issues
grep -r "⏸️ Blocked" issues/modernization/ -l
```

Current Progress: **0 / 11 (0%)**

## 🎬 Getting Started

### Step 1: Read the Documentation

- Read `issues/README.md`
- Familiarize with workflow
- Review Stylus documentation

### Step 2: Start with Phase 1, Issue #001

```bash
cd issues/modernization/phase-1-foundation
open 001-nodejs-update.md
```

### Step 3: Follow the Workflow

1. Read issue thoroughly
2. Check Stylus documentation
3. Write/update tests
4. Implement changes
5. Verify all tests pass
6. Update issue status to 🟢
7. Commit with reference: `git commit -m "feat: update Node.js to 18+ (#001)"`

### Step 4: Move to Next Issue

Follow the dependency chain (listed in each issue)

## 🤝 Contributing

When working on issues:

1. Update issue status at start: 🔴 → 🟡
2. Check off tasks as completed
3. Reference Stylus docs in code/tests
4. Commit with issue number in message
5. Update status when done: 🟡 → 🟢
6. Update dependent issues if needed

## 🆘 Getting Help

**Stylus Documentation**: https://stylus-lang.com/docs/  
**Stylelint Documentation**: https://stylelint.io/  
**Vitest Documentation**: https://vitest.dev/  
**TypeScript Documentation**: https://www.typescriptlang.org/docs/

## ⚠️ Important Notes

### Accuracy is Critical

This plugin must accurately follow the Stylus language specification. Always validate against:

- Official Stylus documentation
- Real-world Stylus projects
- Edge cases from the Stylus compiler

### No Breaking Changes to Stylus Support

We're modernizing the **tooling**, not changing **Stylus support**:

- ✅ Update Node.js, TypeScript, testing
- ✅ Improve performance and DX
- ❌ Don't break Stylus language support
- ❌ Don't introduce false positives

### Test Everything

Every change should:

1. Have tests
2. Pass existing tests
3. Maintain/improve coverage
4. Validate against Stylus docs

## 🎉 Milestones

- [ ] **Milestone 1**: Phase 1 Complete (Foundation solid)
- [ ] **Milestone 2**: Phase 2 Complete (Testing modernized)
- [ ] **Milestone 3**: Phase 3 Complete (TypeScript migration done)
- [ ] **Milestone 4**: v2.0.0 Released (Major modernization complete!)
- [ ] **Milestone 5**: Phase 4 Complete (Optional ESM support)

## 📝 License

This roadmap is part of the stylelint-stylus project, licensed under MIT.

---

**Last Updated**: 2026-02-03  
**Status**: Ready to begin  
**Next Action**: Start with #001 (Node.js Update)

🚀 **Let's modernize stylelint-stylus!**
