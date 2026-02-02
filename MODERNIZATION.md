# 🚀 Modernization Plan - Quick Start

> **Complete modernization setup for stylelint-stylus fork**

## 🤖 The Refactorer Agent (NEW!)

An AI agent is available to execute this plan automatically with strict workflow adherence!

**Quick Start:**

```
You are The Refactorer agent. Read your config from:
.opencode/agents/refactorer.agent.yaml
.opencode/agents/refactorer.instructions.md

Then: Start issue #001
```

**Learn More:** See `.opencode/AGENT-QUICKSTART.md`

**What it does:**

- Reads documentation before every action
- Writes tests before implementation
- Validates against Stylus specs
- Updates issue tracking automatically
- Follows Documentation → Tests → Development workflow strictly

---

## ✅ What's Been Set Up

A comprehensive, phased modernization plan with **11 detailed issues** covering:

✅ Node.js 18+ LTS migration  
✅ Dependency updates  
✅ Vitest migration (from Mocha)  
✅ Integration tests with Stylus docs  
✅ 80% coverage enforcement  
✅ Full TypeScript migration  
✅ ESM support (optional)

## 📁 Structure Created

```
issues/
├── README.md                          # Issue system guide
├── ROADMAP.md                         # Complete roadmap (READ THIS!)
├── templates/                         # 4 issue templates
│   ├── feature.md
│   ├── bug.md
│   ├── modernization.md
│   └── documentation.md
├── modernization/                     # 11 detailed issues
│   ├── phase-1-foundation/           # 3 issues (Weeks 1-2)
│   │   ├── 001-nodejs-update.md
│   │   ├── 002-dependency-updates.md
│   │   └── 003-ci-cd-updates.md
│   ├── phase-2-testing/              # 3 issues (Weeks 3-5)
│   │   ├── 004-vitest-migration.md
│   │   ├── 005-integration-tests.md
│   │   └── 006-coverage-thresholds.md
│   ├── phase-3-typescript/           # 4 issues (Weeks 6-10)
│   │   ├── 007-typescript-setup.md
│   │   ├── 008-utils-migration.md
│   │   ├── 009-rules-migration.md
│   │   └── 010-build-config.md
│   └── phase-4-future/               # 1 issue (Week 11+, optional)
│       └── 011-esm-migration.md
├── features/                          # For future feature requests
├── bugs/                              # For bug tracking
└── documentation/                     # For doc improvements
```

## 🎯 Quick Start

### 1. Read the Documentation

**Start here**: `issues/ROADMAP.md`

- Complete overview
- Detailed timeline
- Success metrics
- Stylus documentation references

### 2. Understand the Workflow

Every issue follows: **Documentation → Tests → Development**

1. **Check Documentation**: Review Stylus docs at https://stylus-lang.com/docs/
2. **Write/Adapt Tests**: TDD approach with Vitest
3. **Develop**: Implement with full test coverage
4. **Verify**: All tests pass, Stylus spec compliant

### 3. Start with Phase 1, Issue #001

```bash
# Open the first issue
cat issues/modernization/phase-1-foundation/001-nodejs-update.md

# Or read in your editor
code issues/modernization/phase-1-foundation/001-nodejs-update.md
```

### 4. Follow the Dependency Chain

Each issue lists dependencies. Follow this order:

**Phase 1** (Foundation):

- #001 → #002 → #003

**Phase 2** (Testing):

- #004 → #005 → #006

**Phase 3** (TypeScript):

- #007 → #008 → #009 → #010

**Phase 4** (Optional):

- #011

## 📊 What Each Issue Contains

Every issue has:

✅ **Description** - What needs to be done  
✅ **Current State** - Where we are now  
✅ **Target State** - Where we're going  
✅ **Stylus Docs References** - Links to official docs  
✅ **Detailed Tasks Checklist** - Step-by-step guide  
✅ **Testing Requirements** - What tests are needed  
✅ **Success Criteria** - How to know it's done  
✅ **Code Examples** - Configuration samples  
✅ **Rollback Plan** - What to do if issues arise  
✅ **Related Issues** - Dependencies and next steps

## 🎓 Key Principles

### 1. Accuracy First

Every change must validate against official Stylus documentation:

- https://stylus-lang.com/docs/

### 2. Test-Driven

Write tests before implementation:

- Reference Stylus docs in test descriptions
- Cover edge cases
- Maintain 80% coverage

### 3. Incremental

Complete one issue fully before moving to the next:

- Update issue status: 🔴 → 🟡 → 🟢
- Check off all tasks
- Verify success criteria
- Commit with issue reference

### 4. Non-Breaking (when possible)

Maintain backward compatibility until v2.0.0:

- Phase 1: v1.1.0 (minor)
- Phase 2-3: v2.0.0 (major)
- Phase 4: v3.0.0 (major, optional)

## 📚 Stylus Documentation Map

Each rule must validate against the Stylus spec:

| Feature   | Docs Link                                                 | Rules Affected        |
| --------- | --------------------------------------------------------- | --------------------- |
| Selectors | [/docs/selectors](https://stylus-lang.com/docs/selectors) | selector-\*           |
| Comments  | [/docs/comments](https://stylus-lang.com/docs/comments)   | single-line-comment\* |
| @import   | [/docs/import](https://stylus-lang.com/docs/import)       | at-rule-\*            |
| @extend   | [/docs/extend](https://stylus-lang.com/docs/extend)       | at-extend-style       |
| @media    | [/docs/media](https://stylus-lang.com/docs/media)         | media-feature-\*      |
| Variables | [/docs/variables](https://stylus-lang.com/docs/variables) | property/value rules  |
| Mixins    | [/docs/mixins](https://stylus-lang.com/docs/mixins)       | function features     |
| Hashes    | [/docs/hashes](https://stylus-lang.com/docs/hashes)       | hash-object-\*        |
| CSS Style | [/docs/css-style](https://stylus-lang.com/docs/css-style) | whitespace rules      |

**Full list in**: `issues/README.md`

## 🎯 Expected Outcomes

### After Phase 1 (Weeks 1-2)

- ✅ Node.js 18, 20, 22 support
- ✅ All dependencies updated
- ✅ No security vulnerabilities
- ✅ CI 60% faster

### After Phase 2 (Weeks 3-5)

- ✅ Vitest (3-4x faster tests)
- ✅ 20+ integration tests
- ✅ 80% coverage enforced
- ✅ Real-world Stylus files tested

### After Phase 3 (Weeks 6-10)

- ✅ Full TypeScript
- ✅ Type definitions for consumers
- ✅ All 34 rules migrated
- ✅ Better DX and maintainability

### After Phase 4 (Week 11+, Optional)

- ✅ ESM + CJS dual package
- ✅ Modern module system
- ✅ Better tree-shaking

## 📈 Progress Tracking

Track your progress:

```bash
# See completed issues
grep -r "🟢 Completed" issues/modernization/ | wc -l

# See in-progress issues
grep -r "🟡 In Progress" issues/modernization/ -l

# Calculate percentage
# (Completed / 11) * 100
```

**Current Progress**: 0 / 11 (0%)

## 🚦 Status Legend

- 🔴 **Not Started** - Ready to begin
- 🟡 **In Progress** - Currently working
- 🟢 **Completed** - Done and verified
- ⏸️ **Blocked** - Waiting on dependencies
- ❌ **Cancelled** - Closed without completion

## 🔧 Useful Commands

```bash
# View an issue
cat issues/modernization/phase-1-foundation/001-nodejs-update.md

# Check progress
grep -r "Status:" issues/modernization/

# List all issues
find issues/modernization -name "*.md" -type f

# Search for specific topic
grep -r "Stylus Documentation" issues/
```

## 📖 Documentation Files

1. **MODERNIZATION.md** (this file) - Quick start guide
2. **issues/README.md** - Issue system guide
3. **issues/ROADMAP.md** - Complete roadmap
4. **issues/templates/** - Templates for new issues
5. **issues/modernization/** - 11 detailed issues

## 🎬 Next Steps

1. **Read**: `issues/ROADMAP.md` (complete overview)
2. **Start**: `issues/modernization/phase-1-foundation/001-nodejs-update.md`
3. **Follow**: Documentation → Tests → Development workflow
4. **Update**: Issue status as you progress
5. **Commit**: Reference issue numbers in commits
6. **Verify**: All success criteria met

## ⚠️ Important Reminders

### Do NOT:

- ❌ Start implementation without reading the issue
- ❌ Skip tests or documentation
- ❌ Break Stylus language support
- ❌ Ignore Stylus documentation
- ❌ Work on multiple issues in parallel

### DO:

- ✅ Read issue thoroughly first
- ✅ Check Stylus docs for accuracy
- ✅ Write tests before coding
- ✅ Update issue status
- ✅ Commit with issue references
- ✅ Verify all success criteria

## 🆘 Getting Help

- **Stylus Docs**: https://stylus-lang.com/docs/
- **Stylelint Docs**: https://stylelint.io/
- **Vitest Docs**: https://vitest.dev/
- **TypeScript Docs**: https://www.typescriptlang.org/docs/

## 🎉 Summary

You now have:

✅ **11 detailed issues** ready to work on  
✅ **Complete roadmap** with timeline  
✅ **Issue templates** for future use  
✅ **Workflow guide** (Documentation → Tests → Development)  
✅ **Stylus documentation** references throughout  
✅ **Success criteria** for each phase  
✅ **Progress tracking** system

**Everything is documented. Nothing requires implementation yet.**

---

## 🚀 Ready to Begin?

**Start here**: `issues/modernization/phase-1-foundation/001-nodejs-update.md`

**Remember**: Documentation → Tests → Development

**Good luck with the modernization!** 🎯

---

**Created**: 2026-02-03  
**Status**: Ready  
**Issues**: 11 (0 started, 0 completed)  
**Estimated Duration**: 10-11 weeks
