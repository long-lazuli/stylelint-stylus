# 🤖 The Refactorer Agent - Quick Start

## What Is The Refactorer?

An AI agent that executes the stylelint-stylus modernization plan with **strict adherence** to the Documentation → Tests → Development workflow.

## How to Invoke

### Option 1: Direct (Recommended)

Tell your AI assistant:

```
You are The Refactorer agent for stylelint-stylus modernization.

Read your configuration:
- .opencode/agents/refactorer.agent.yaml
- .opencode/agents/refactorer.instructions.md

Then: Start issue #001
```

### Option 2: Natural Language

```
@refactorer start issue #001
```

## Core Commands

| Command                                    | Action                        |
| ------------------------------------------ | ----------------------------- |
| `Start issue #NNN`                         | Begin work on specific issue  |
| `Continue current issue`                   | Resume in-progress issue      |
| `Show progress`                            | Display status and next steps |
| `Validate Stylus compliance for [feature]` | Check against Stylus spec     |

## What The Agent Does

### 1. Reads Documentation (ALWAYS FIRST)

- Issue file from `issues/modernization/`
- Referenced Stylus documentation
- Technical docs (Vitest, TypeScript, etc.)

### 2. Plans Tests

- Designs test structure from Stylus docs
- Identifies edge cases
- Plans coverage targets

### 3. Writes Tests (TDD - RED Phase)

- Creates test files with Stylus doc references
- Verifies tests fail appropriately
- Ensures meaningful coverage

### 4. Implements Changes (GREEN Phase)

- Follows issue specification
- Makes tests pass
- Validates against Stylus spec

### 5. Verifies Everything

- Runs full test suite
- Checks coverage (≥80%)
- Tests with real-world Stylus files
- Validates Stylus compliance

### 6. Updates Issue Status

- Changes 🔴 → 🟡 → 🟢
- Checks off tasks
- Documents findings

## The Agent NEVER:

❌ Starts without reading documentation  
❌ Skips writing tests  
❌ Breaks Stylus language support  
❌ Works on multiple issues at once  
❌ Ignores Stylus documentation

## The Agent ALWAYS:

✅ Reads issue + Stylus docs first  
✅ Writes tests before coding  
✅ References Stylus docs in tests  
✅ Updates issue status  
✅ Validates Stylus compliance  
✅ Maintains coverage ≥80%

## Workflow Example

```
User: Start issue #001

Agent:
📋 Starting Issue #001: Node.js Update

Reading documentation:
✓ Issue file
✓ Current/target state understood
✓ No Stylus docs (infrastructure task)

Step 1: Read Documentation ✓
Step 2: Plan Tests ✓
Step 3: Write Tests ✓
Step 4: Implement Changes ✓
  - Updated package.json engines
  - Updated CI matrix
  - Removed old Node versions
Step 5: Verify & Refine ✓
  - All tests pass ✓
  - CI runs on Node 18, 20, 22 ✓
Step 6: Update Issue Status ✓

🎉 Issue #001 Completed!

Next: Issue #002 (Dependency Updates)
Dependencies met: Yes
Ready to proceed: Yes
```

## Issue Execution Order

**Phase 1:**
001 → 002 → 003

**Phase 2:**
004 → 005 → 006

**Phase 3:**
007 → 008 → 009 → 010

**Phase 4 (Optional):**
011

## Stylus Documentation Quick Reference

The agent references these automatically:

| Feature   | URL                                    |
| --------- | -------------------------------------- |
| Selectors | https://stylus-lang.com/docs/selectors |
| Comments  | https://stylus-lang.com/docs/comments  |
| @extend   | https://stylus-lang.com/docs/extend    |
| @media    | https://stylus-lang.com/docs/media     |
| Variables | https://stylus-lang.com/docs/variables |
| Mixins    | https://stylus-lang.com/docs/mixins    |

Full list in issue files.

## Quality Assurance

Before completing ANY issue:

- [ ] All tasks checked off
- [ ] All tests pass
- [ ] Coverage ≥80%
- [ ] Stylus docs validated
- [ ] Real-world testing done
- [ ] Issue marked 🟢

## Troubleshooting

**Agent not reading docs?**

```
Reminder: Read the issue file and Stylus documentation first
```

**Agent skipping tests?**

```
Follow the strict 6-step workflow. Write tests before implementation.
```

**Agent rushing?**

```
Take your time. Read documentation thoroughly. Quality over speed.
```

## Progress Tracking

Check progress anytime:

```
Show progress
```

Output:

```
Current: 3/11 issues (27%)
Phase: 1 - Foundation
Current Issue: #003 (🟡 In Progress)
Completed: #001, #002
Next: #004 (Vitest Migration)
```

## Configuration Files

| File                         | Purpose                |
| ---------------------------- | ---------------------- |
| `refactorer.agent.yaml`      | Agent configuration    |
| `refactorer.instructions.md` | Detailed instructions  |
| `config.yaml`                | OpenCode system config |
| `AGENT-QUICKSTART.md`        | This file              |

## Key Principles

1. **Documentation First** - Always read before acting
2. **Test-Driven** - Red → Green → Refactor
3. **Stylus Compliance** - Validate against official docs
4. **Incremental** - One issue at a time
5. **Quality** - 80% coverage, no regressions

## Getting Help

- **Agent Config**: `.opencode/agents/refactorer.agent.yaml`
- **Agent Instructions**: `.opencode/agents/refactorer.instructions.md`
- **Project Roadmap**: `issues/ROADMAP.md`
- **Issue Guide**: `issues/README.md`

## Ready to Begin?

Invoke The Refactorer:

```
You are The Refactorer agent. Read your config from .opencode/agents/

Start issue #001
```

---

**Let The Refactorer execute the plan with precision!** 🚀
