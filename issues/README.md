# Issues Management System

This directory contains all issues, feature requests, bugs, and modernization tasks for the stylelint-stylus project.

## 📁 Directory Structure

```
issues/
├── README.md                          # This file
├── templates/                         # Issue templates
│   ├── feature.md                     # Feature request template
│   ├── bug.md                         # Bug report template
│   ├── modernization.md               # Modernization task template
│   └── documentation.md               # Documentation improvement template
├── modernization/                     # Modernization tasks (phased)
│   ├── phase-1-foundation/
│   ├── phase-2-testing/
│   ├── phase-3-typescript/
│   └── phase-4-future/
├── features/                          # Future feature requests
├── bugs/                              # Bug tracking
└── documentation/                     # Documentation improvements
```

## 🎯 Issue Status Legend

- 🔴 **Not Started** - Issue is defined but work hasn't begun
- 🟡 **In Progress** - Currently being worked on (development phase)
- 🔵 **In Review** - Development complete, awaiting review/approval
- 🟢 **Completed** - Issue is reviewed, approved, and finalized
- ⏸️ **Blocked** - Cannot proceed due to dependencies or external factors
- ❌ **Cancelled** - Issue was closed without completion

## 📝 How to Use This System

### Creating a New Issue

1. Choose the appropriate template from `templates/`
2. Copy the template to the appropriate folder
3. Fill in all sections
4. Update the status to 🔴 Not Started
5. Link dependencies if applicable

### Working on an Issue

1. Update status to 🟡 In Progress
2. Follow the workflow: **Documentation → Tests → Development**
3. Check off tasks as completed
4. Reference the issue number in commits (e.g., `git commit -m "feat: add X (#001)"`)

### Submitting for Review

1. Verify all tasks are checked
2. Verify all success criteria are met
3. Update status to 🔵 In Review
4. Run code-review workflow (or self-review)
5. Wait for approval (from yourself or team member)

### Completing an Issue

1. Review must be approved
2. All quality gates passed
3. Update status to 🟢 Completed
4. Commits are ready locally (2 commits: implementation + approval)
5. User pushes when ready: `git push`
6. Update dependent issues if applicable

## 🔄 Development Workflow

For all issues, follow this standardized workflow:

### 1. Check Documentation

- Review relevant Stylus documentation at https://stylus-lang.com/docs/
- Review relevant Stylelint documentation
- Research best practices and patterns
- Document findings in the issue

### 2. Write/Adapt Tests

- Create new test files or update existing ones
- Follow test-driven development principles
- Ensure tests cover edge cases
- Reference Stylus documentation in test descriptions

### 3. Development

- Implement the feature/fix
- Ensure all tests pass
- Follow code style guidelines
- Update documentation if needed

### 4. Verification

- Run full test suite
- Check coverage hasn't decreased
- Verify Stylus language compatibility
- Test with real-world Stylus files if applicable

## 📚 Stylus Documentation Quick Reference

| Topic            | URL                                       | Related Issues         |
| ---------------- | ----------------------------------------- | ---------------------- |
| Selectors        | https://stylus-lang.com/docs/selectors    | selector-\* rules      |
| Comments         | https://stylus-lang.com/docs/comments     | comment rules          |
| Variables        | https://stylus-lang.com/docs/variables    | property/value rules   |
| Operators        | https://stylus-lang.com/docs/operators    | value parsing          |
| Mixins           | https://stylus-lang.com/docs/mixins       | function-like features |
| Functions        | https://stylus-lang.com/docs/functions    | built-in functions     |
| @import/@require | https://stylus-lang.com/docs/import       | at-rule-\*             |
| @media           | https://stylus-lang.com/docs/media        | media-feature-\*       |
| @extend          | https://stylus-lang.com/docs/extend       | at-extend-style        |
| @keyframes       | https://stylus-lang.com/docs/keyframes    | at-rule-\*             |
| CSS Literal      | https://stylus-lang.com/docs/literal      | parsing edge cases     |
| CSS Style Syntax | https://stylus-lang.com/docs/css-style    | all whitespace rules   |
| Conditionals     | https://stylus-lang.com/docs/conditionals | control flow           |
| Iteration        | https://stylus-lang.com/docs/iteration    | loops                  |
| Hashes           | https://stylus-lang.com/docs/hashes       | hash-object-\*         |

## 🗺️ Modernization Roadmap

### Phase 1: Foundation (Weeks 1-2)

**Goal**: Modern Node.js, stable dependencies, improved CI/CD

- **001-nodejs-update.md** - Update to Node.js 18+ LTS
- **002-dependency-updates.md** - Update all dependencies
- **003-ci-cd-updates.md** - Modernize GitHub Actions

### Phase 2: Testing Infrastructure (Weeks 3-5)

**Goal**: Modern, fast testing with Vitest + integration tests

- **004-vitest-migration.md** - Migrate from Mocha to Vitest
- **005-integration-tests.md** - Add comprehensive integration tests
- **006-coverage-thresholds.md** - Enforce 80% coverage

### Phase 3: TypeScript Migration (Weeks 6-10)

**Goal**: Full TypeScript for type safety and better DX

- **007-typescript-setup.md** - Configure TypeScript build
- **008-utils-migration.md** - Migrate utility files
- **009-rules-migration.md** - Migrate all 34 rules
- **010-build-config.md** - Production build configuration

### Phase 4: Future Enhancements (Week 11+)

**Goal**: Optional ESM migration

- **011-esm-migration.md** - Dual package ESM + CJS support

## 📊 Progress Tracking

Track overall progress:

```bash
# Count completed issues
grep -r "🟢 Completed" issues/modernization/ | wc -l

# Count total issues
find issues/modernization -name "*.md" | wc -l

# List in-progress issues
grep -r "🟡 In Progress" issues/modernization/ -l
```

## 🤝 Contributing

When creating new issues:

1. Use the appropriate template
2. Be specific and actionable
3. Link related Stylus documentation
4. Define clear success criteria
5. Estimate effort realistically
6. List all dependencies

## 📞 Getting Help

- **Stylus Documentation**: https://stylus-lang.com/docs/
- **Stylelint Documentation**: https://stylelint.io/
- **Vitest Documentation**: https://vitest.dev/
- **TypeScript Documentation**: https://www.typescriptlang.org/docs/

## 🎯 Current Priority

**Next to work on**: Phase 1, Issue 001 (Node.js Update)

Start there and follow the dependency chain!
