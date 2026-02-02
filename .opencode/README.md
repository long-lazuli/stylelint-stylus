# OpenCode Agent System

This directory contains AI agent configurations for the stylelint-stylus modernization project.

## Agents

### The Refactorer

**File:** `agents/refactorer.agent.yaml`  
**Purpose:** Execute the modernization plan with strict workflow adherence  
**Status:** Active

## Workflows

Four workflows orchestrate the development process:

1. **start-next-dev** - Begin work on next issue (🔴 → 🟡)
2. **dev-story** - Execute 6-step development workflow (🟡 → 🔵)
3. **code-review** - Comprehensive quality review (🔵 validation)
4. **approve-issue** - Finalize and complete issue (🔵 → 🟢)

See `workflows/README.md` for details.

**Key Features:**

- Strict Documentation → Tests → Development workflow
- Stylus language specification validation
- Automatic issue tracking and progress updates
- Test-driven development enforcement
- Incremental, one-issue-at-a-time execution

## How to Use

### Invoke The Refactorer

**Method 1: Direct Invocation (recommended)**

When talking to your AI assistant, use this format:

```
You are The Refactorer agent. Read your configuration from:
.opencode/agents/refactorer.agent.yaml
.opencode/agents/refactorer.instructions.md

Then execute: [your command]
```

**Method 2: Natural Language**

```
@refactorer start issue #001
@refactorer continue current issue
@refactorer show progress
```

### Available Commands

#### Start New Issue

```
Start issue #001
```

Begins work on the specified issue, following the complete workflow.

#### Continue Current Issue

```
Continue current issue
```

Resumes work on the in-progress issue from the last checkpoint.

#### Validate Stylus Compliance

```
Validate Stylus compliance for [feature]
```

Validates a specific feature against Stylus documentation.

#### Check Progress

```
Show progress
```

Displays current progress, completed issues, and next steps.

## Agent Workflow

Every task follows these 6 steps:

1. **Read Documentation** - Issue file + Stylus docs
2. **Plan Tests** - Design test structure
3. **Write/Update Tests** - TDD approach (RED phase)
4. **Implement Changes** - Make tests pass (GREEN phase)
5. **Verify & Refine** - Full validation
6. **Update Issue Status** - Track progress

## Configuration Files

| File                         | Purpose                             |
| ---------------------------- | ----------------------------------- |
| `refactorer.agent.yaml`      | Agent configuration (YAML)          |
| `refactorer.instructions.md` | Detailed instructions for the agent |
| `README.md`                  | This file - usage guide             |

## Agent Principles

### NEVER:

- Start without reading documentation
- Skip writing tests
- Break Stylus language support
- Work on multiple issues simultaneously

### ALWAYS:

- Read issue + Stylus docs first
- Write tests before implementation
- Reference Stylus docs in tests
- Update issue status as you work
- Verify all success criteria

## Integration with Modernization Plan

The Refactorer agent is designed to execute issues from:

```
issues/modernization/
├── phase-1-foundation/
├── phase-2-testing/
├── phase-3-typescript/
└── phase-4-future/
```

See `MODERNIZATION.md` for the complete plan.

## Issue Status Indicators

- 🔴 Not Started
- 🟡 In Progress
- 🟢 Completed
- ⏸️ Blocked
- ❌ Cancelled

## Example Session

```
User: Start issue #001

Agent: 📋 Starting Issue #001: Node.js Update

Reading documentation:
- Issue: issues/modernization/phase-1-foundation/001-nodejs-update.md ✓
- Current state: Node 12+ support
- Target state: Node 18+ LTS

Step 1: Reading Documentation... ✓
Step 2: Planning Tests... ✓
Step 3: Writing Tests... ⏳

[Agent works through all 6 steps]

🎉 Issue #001 Completed!

Summary:
- Updated package.json engines to >=18.0.0
- Updated CI matrix to Node 18, 20, 22
- All tests pass on all versions

Status: 🟢 Completed
Next: Issue #002
```

## Stylus Documentation References

The agent automatically references:

- https://stylus-lang.com/docs/

Specific sections are linked in each issue file.

## Quality Assurance

Before any issue is marked complete:

- ✓ All tasks checked
- ✓ All tests pass
- ✓ Coverage maintained/improved
- ✓ Stylus compliance verified
- ✓ Real-world testing done (if applicable)

## Troubleshooting

### Agent not following workflow

Ensure the agent reads both configuration files on invocation:

- `refactorer.agent.yaml`
- `refactorer.instructions.md`

### Agent skipping steps

Remind the agent: "Follow the strict 6-step workflow from your instructions"

### Agent not reading Stylus docs

Explicitly state: "Read the Stylus documentation referenced in the issue"

## Version

**Current Version:** 1.0.0  
**Created:** 2026-02-03  
**Last Updated:** 2026-02-03

## License

Part of stylelint-stylus project, MIT licensed.

---

**Ready to modernize!** Invoke The Refactorer and let it execute the plan with precision.
