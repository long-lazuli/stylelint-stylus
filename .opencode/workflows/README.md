# Workflows

Development workflows for the stylelint-stylus modernization project. These workflows orchestrate the development process following the strict Documentation → Tests → Development methodology.

## Available Workflows

### 1. start-next-dev

**Purpose:** Transition next issue to "in progress" and start development  
**File:** `start-next-dev.yaml`  
**Usage:** `start next dev`

**What it does:**

1. Finds the next available issue (dependencies met)
2. Updates issue status to 🟡 In Progress
3. Displays issue summary
4. Automatically invokes `dev-story` workflow

**When to use:**

- Starting work on a new issue
- After completing previous issue
- When ready to begin next phase

**Example:**

```
> start next dev

📋 STARTING ISSUE #001: Node.js Update
Status: 🟡 In Progress

Initiating dev-story workflow...
```

---

### 2. dev-story

**Purpose:** Execute the core 6-step development workflow  
**File:** `dev-story.yaml`  
**Usage:** `dev story` or automatic from `start-next-dev`

**The 6 Steps:**

1. **Read Documentation** (15-30 min) - Issue file + Stylus docs
2. **Plan Tests** (15-30 min) - Design test structure
3. **Write/Update Tests** (30-60 min) - TDD RED phase
4. **Implement Changes** (1-3 hours) - TDD GREEN phase
5. **Verify & Refine** (30 min) - Full validation
6. **Update Issue Status** (15 min) - Mark complete, commit

**What it does:**

- Enforces strict Documentation → Tests → Development workflow
- Validates against Stylus specification at every step
- Ensures TDD approach (RED → GREEN → REFACTOR)
- Maintains ≥80% coverage
- Updates issue tracking automatically

**When to use:**

- Automatically invoked by `start-next-dev`
- Manually when continuing work on current issue

**Example:**

```
> dev story

Step 1: Read Documentation ✓
Step 2: Plan Tests ✓
Step 3: Write Tests (RED) ✓
Step 4: Implement (GREEN) ✓
Step 5: Verify & Refine ✓
Step 6: Update Status ✓

🎉 Issue #001 Development Complete
Ready for code review!
```

---

### 4. approve-issue

**Purpose:** Approve and finalize reviewed issue  
**File:** `approve-issue.yaml`  
**Usage:** `approve issue #NNN` or `approve`

**What it does:**

- Verifies review is complete
- Updates issue status: 🔵 In Review → 🟢 Completed
- Records completion timestamp
- Commits status update
- Prepares for next issue

**When to use:**

- After code-review passes (automatic)
- After manual review by user
- When ready to mark issue complete

**Example:**

```
> approve issue #001

✅ ISSUE #001 APPROVED & COMPLETED
Status: 🟢 Completed
Commits ready (2 commits)

Next: start next dev
(User will git push all commits when ready)
```

> code review

Review 1: Code Quality ✓
Review 2: Test Coverage ✓
Review 3: Stylus Compliance ✓
Review 4: Requirements ✓
Review 5: Documentation ✓
Review 6: Integration ✓

✅ CODE REVIEW APPROVED
Run: approve issue #001

```

---

### 4. approve-issue

**Purpose:** Comprehensive code review before finalization
**File:** `code-review.yaml`
**Usage:** `code review`

**The 6 Review Sections:**

1. **Code Quality** - Linting, patterns, documentation
2. **Test Coverage & Quality** - ≥80%, meaningful tests
3. **Stylus Compliance** - Spec validation, no false positives
4. **Issue Requirements** - All criteria met
5. **Documentation** - Complete and accurate
6. **Integration & Regressions** - No breaking changes

**What it does:**

- Performs comprehensive quality checks
- Validates Stylus compliance
- Verifies all requirements met
- Checks for regressions
- Generates review report

**When to use:**

- After `dev-story` completes
- Before pushing commits
- When ready to finalize issue

**Example:**

```

> code review

Review 1: Code Quality ✓
Review 2: Test Coverage ✓
Review 3: Stylus Compliance ✓
Review 4: Requirements ✓
Review 5: Documentation ✓
Review 6: Integration ✓

✅ CODE REVIEW APPROVED
All quality gates passed!

```

---

## Workflow Sequence

### Typical Development Flow

```

1. start next dev
   └─> Finds next issue
   └─> Updates status to 🟡 In Progress
   └─> Invokes dev-story
2. dev-story
   └─> Step 1: Read Documentation
   └─> Step 2: Plan Tests
   └─> Step 3: Write Tests (RED)
   └─> Step 4: Implement (GREEN)
   └─> Step 5: Verify & Refine
   └─> Step 6: Update Status to 🔵 In Review
3. code review (or manual review)
   └─> 6 review sections
   └─> Generate report
   └─> Approve/Request Changes/Reject
4. approve issue (if review passed)
   └─> Update status to 🟢 Completed
   └─> Commit status update (local)
5. Continue to next
   └─> Start next issue
   └─> User pushes all commits when ready

```

1. start next dev
   └─> Finds next issue
   └─> Updates status to 🟡
   └─> Invokes dev-story

2. dev-story
   └─> Step 1: Read Documentation
   └─> Step 2: Plan Tests
   └─> Step 3: Write Tests (RED)
   └─> Step 4: Implement (GREEN)
   └─> Step 5: Verify & Refine
   └─> Step 6: Update Status (🟢)

3. code review
   └─> 6 review sections
   └─> Generate report
   └─> Approve/Request Changes/Reject

4. If approved:
   └─> Push commits
   └─> Go back to step 1 (start next dev)

```

### Visual Flow

```
┌─────────────────┐
│ start next dev  │
│   Status: 🟡    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   dev-story     │
│  ┌───────────┐  │
│  │ 1. Read   │  │
│  │ 2. Plan   │  │
│  │ 3. Test   │  │
│  │ 4. Code   │  │
│  │ 5. Verify │  │
│  │ 6. Review │  │
│  └───────────┘  │
│   Status: 🔵    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  code review    │
│  ┌───────────┐  │
│  │ Quality   │  │
│  │ Tests     │  │
│  │ Stylus    │  │
│  │ Reqs      │  │
│  │ Docs      │  │
│  │ No Reg    │  │
│  └───────────┘  │
└────────┬────────┘
         │
    ┌────┴────┐
    │ Pass?   │
    └────┬────┘
         │
    ┌────┴────────────┐
    │                 │
   YES               NO
    │                 │
    ▼                 ▼
┌──────────┐    ┌──────────────┐
│  approve │    │ Fix Issues & │
│  issue   │    │ Re-review    │
│Status:🟢 │    │              │
└────┬─────┘    └──────────────┘
     │
     ▼
┌──────────┐
│  Commits │
│  Ready   │
│User Push │
└──────────┘
```

┌─────────────────┐
│ start next dev │
└────────┬────────┘
│
▼
┌─────────────────┐
│ dev-story │
│ ┌───────────┐ │
│ │ 1. Read │ │
│ │ 2. Plan │ │
│ │ 3. Test │ │
│ │ 4. Code │ │
│ │ 5. Verify │ │
│ │ 6. Update │ │
│ └───────────┘ │
└────────┬────────┘
│
▼
┌─────────────────┐
│ code review │
│ ┌───────────┐ │
│ │ Quality │ │
│ │ Tests │ │
│ │ Stylus │ │
│ │ Reqs │ │
│ │ Docs │ │
│ │ No Reg │ │
│ └───────────┘ │
└────────┬────────┘
│
┌────┴────┐
│ Approve? │
└────┬─────┘
│
┌────┴────────────┐
│ │
YES NO
│ │
▼ ▼
┌──────────┐ ┌──────────────┐
│ Push & │ │ Fix Issues & │
│ Next Dev │ │ Re-review │
└──────────┘ └──────────────┘

````

## Workflow Integration with Agent

These workflows are designed to be executed by **The Refactorer** agent. The agent:

1. Reads workflow definitions
2. Executes steps in order
3. Validates at each step
4. Halts if validation fails
5. Reports progress and results

### Agent Integration

```yaml
# The Refactorer agent uses these workflows
Agent: refactorer
  → Workflow: start-next-dev
    → Workflow: dev-story (automatic)
      → Agent executes 6 steps strictly
      → Validates against Stylus spec
    → Workflow: code-review (manual)
      → Agent performs all checks
      → Generates report
````

## Workflow Configuration

Each workflow YAML file contains:

- **name:** Workflow identifier
- **description:** What the workflow does
- **trigger:** How to invoke it
- **prerequisites:** Required conditions
- **steps:** Ordered execution steps
- **validation:** Quality gates
- **outputs:** Expected results
- **success criteria:** Pass conditions
- **error handling:** Failure scenarios

## Quality Gates

All workflows enforce these quality gates:

### Mandatory

- ✅ All tests pass
- ✅ Coverage ≥ 80%
- ✅ No linting errors
- ✅ Stylus spec compliant
- ✅ All success criteria met

### Recommended

- ✅ No type errors (Phase 3+)
- ✅ Real-world testing done
- ✅ Docs build successfully

## Error Handling

Each workflow includes error handling for common scenarios:

### start-next-dev errors:

- No next issue available
- Issue already in progress
- Dependencies not met

### dev-story errors:

- Tests not failing (RED phase)
- Tests not passing (GREEN phase)
- Coverage dropped
- Stylus compliance failed
- Success criteria not met

### code-review errors:

- Linting failures
- Test failures
- Stylus spec violations
- Missing requirements
- Documentation incomplete

## Customization

Workflows can be customized by editing the YAML files:

```yaml
# Example: Adjust coverage threshold
validation:
  coverage_threshold: 85 # Increase from 80%
```

## Best Practices

### When using workflows:

1. **Always start with start-next-dev**

   - Don't manually change issue status
   - Let workflow find next issue

2. **Follow dev-story steps strictly**

   - Don't skip documentation reading
   - Write tests before implementation
   - Verify Stylus compliance

3. **Run code-review before pushing**

   - Catch issues early
   - Ensure quality standards
   - Verify no regressions

4. **One issue at a time**
   - Complete before starting next
   - Maintain focus
   - Prevent conflicts

## Troubleshooting

### Workflow not starting?

- Check prerequisites
- Verify issue status
- Ensure no uncommitted changes

### Workflow failing at step?

- Review validation criteria
- Check error messages
- Refer to issue requirements

### Tests not passing?

- Review Stylus documentation
- Check test expectations
- Verify implementation

## Integration with Issue Tracking

Workflows integrate with the issue management system:

```
issues/modernization/
  └─ phase-N-name/
     └─ NNN-issue-name.md
        └─ Status: 🔴 → 🟡 → 🟢
```

Status transitions:

- 🔴 **Not Started** → `start-next-dev` → 🟡 **In Progress**
- 🟡 **In Progress** → `dev-story complete` → 🔵 **In Review** (commit created)
- 🔵 **In Review** → `approve-issue` → 🟢 **Completed** (approval committed)
- 🟢 **Completed** → Commits ready (user pushes when ready)

## Examples

### Complete Issue from Start to Finish

```bash
# 1. Start next issue
> start next dev
📋 STARTING ISSUE #001: Node.js Update
Initiating dev-story workflow...

# 2. Dev story runs automatically
Step 1: Read Documentation ✓
  - Read issue file
  - Read Node.js LTS schedule
Step 2: Plan Tests ✓
  - Verify package.json updates
  - Verify CI matrix updates
Step 3: Write Tests ✓
  - Update test expectations
Step 4: Implement ✓
  - Update package.json engines
  - Update CI workflows
Step 5: Verify ✓
  - All tests pass
  - No regressions
Step 6: Update Status ✓
  - Issue marked complete
  - Commit created

🎉 Issue #001 Complete!

# 3. Code review
> code review
Review 1: Code Quality ✓
Review 2: Tests ✓
Review 3: Stylus N/A (infrastructure)
Review 4: Requirements ✓
Review 5: Documentation ✓
Review 6: Integration ✓

✅ APPROVED
Run: approve issue #001

# 4. Approve issue
> approve issue #001
✅ ISSUE #001 APPROVED & COMPLETED
Status: 🟢 Completed

# 5. Push and continue
> git push
> start next dev
📋 STARTING ISSUE #002: Dependency Updates
...
```

## Metadata

**Created:** 2026-02-03  
**Inspiration:** BMAD Method workflows  
**Adapted for:** stylelint-stylus modernization  
**Workflows:** 3 (start-next-dev, dev-story, code-review)

---

**Ready to begin development!** Start with `start next dev` and let the workflows guide you through the modernization process.
