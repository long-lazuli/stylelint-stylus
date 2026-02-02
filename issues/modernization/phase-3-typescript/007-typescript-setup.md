# 007: TypeScript Setup

**Status**: 🔴 Not Started  
**Priority**: High  
**Phase**: 3 (TypeScript Migration)  
**Estimated Effort**: 1-2 days  
**Dependencies**: #004 (Vitest Migration - TypeScript support ready)

## Description

Set up TypeScript compiler, build system, and project structure to enable full TypeScript migration of the codebase. This establishes the foundation for type-safe development.

## Current State

- Language: JavaScript (CommonJS)
- No type checking
- No TypeScript configuration
- JSDoc comments for some type hints
- Code in `lib/` directory

## Target State

- TypeScript configured and working
- Source code in `src/` directory (.ts files)
- Compiled output in `lib/` directory (.js + .d.ts files)
- Type checking in development and CI
- Declaration files generated for consumers
- Build scripts functional

## Benefits

- Type safety (catch errors at compile time)
- Better IDE support (autocomplete, refactoring)
- Self-documenting code
- Easier refactoring
- Better collaboration
- Prevents common JavaScript pitfalls

## Stylus Documentation References

N/A (Infrastructure task)

## Tasks Checklist

### Part 1: Install Dependencies

- [ ] Install TypeScript:
  ```bash
  npm install -D typescript @types/node
  ```
- [ ] Install type definitions for dependencies:
  ```bash
  npm install -D @types/lodash @types/semver
  ```
- [ ] Verify Vitest TypeScript support (already configured in #004)

### Part 2: Create tsconfig.json

- [ ] Create `tsconfig.json` in project root:
  ```json
  {
    "compilerOptions": {
      "target": "ES2022",
      "module": "commonjs",
      "lib": ["ES2022"],
      "outDir": "./lib",
      "rootDir": "./src",
      "declaration": true,
      "declarationMap": true,
      "sourceMap": true,
      "strict": true,
      "esModuleInterop": true,
      "skipLibCheck": true,
      "forceConsistentCasingInFileNames": true,
      "moduleResolution": "node",
      "resolveJsonModule": true,
      "allowSyntheticDefaultImports": true,
      "types": ["node"]
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "lib", "tests", "docs", "scripts"]
  }
  ```

### Part 3: Create tsconfig for Tests

- [ ] Create `tsconfig.test.json` for test files:
  ```json
  {
    "extends": "./tsconfig.json",
    "compilerOptions": {
      "rootDir": ".",
      "noEmit": true
    },
    "include": ["src/**/*", "tests/**/*"]
  }
  ```

### Part 4: Directory Structure

- [ ] Create `src/` directory:
  ```bash
  mkdir src
  ```
- [ ] Plan migration structure:
  ```
  src/
  ├── index.ts                    # Main entry
  ├── types/                      # Type definitions
  │   ├── stylelint.ts           # Stylelint types
  │   ├── stylus.ts              # Stylus-specific types
  │   └── rules.ts               # Rule types
  ├── utils/                      # Utilities (migrate from lib/utils/)
  │   ├── get-stylus-source.ts
  │   ├── is-*.ts                # Type guards
  │   └── ...
  └── rules/                      # Rules (migrate from lib/rules/)
      ├── index.ts
      ├── at-extend-style.ts
      └── ...
  ```

### Part 5: Update package.json

- [ ] Add build scripts:
  ```json
  {
    "scripts": {
      "build": "tsc",
      "build:watch": "tsc --watch",
      "type-check": "tsc --noEmit",
      "type-check:test": "tsc --noEmit -p tsconfig.test.json",
      "prepublishOnly": "npm run build",
      "clean": "rm -rf lib"
    }
  }
  ```
- [ ] Update main/types fields:
  ```json
  {
    "main": "lib/index.js",
    "types": "lib/index.d.ts"
  }
  ```
- [ ] Update files field:
  ```json
  {
    "files": [
      "lib",
      "!lib/**/*.map",
      "custom-syntax",
      "standard",
      "recommended",
      "base-config",
      "no-stylus"
    ]
  }
  ```

### Part 6: Update .gitignore

- [ ] Ignore compiled files:
  ```
  /lib/**/*.js
  /lib/**/*.d.ts
  /lib/**/*.js.map
  /lib/**/*.d.ts.map
  ```
- [ ] Keep lib structure files (package.json, etc.) if any

### Part 7: Update CI Workflow

- [ ] Add type checking to CI:

  ```yaml
  - name: Type Check
    run: npm run type-check

  - name: Build
    run: npm run build
  ```

- [ ] Run build before tests to ensure compilation works

### Part 8: Create Initial TypeScript Files

Create basic type definitions to get started:

- [ ] Create `src/types/stylelint.ts`:

  ```typescript
  import type { Rule, RuleContext } from "stylelint";

  export type StylelintRule<Primary, Secondary = never> = Rule<
    Primary,
    Secondary
  >;
  export type RuleContext = RuleContext;
  // ... more types
  ```

- [ ] Create `src/types/stylus.ts`:

  ```typescript
  export interface StylusNode {
    type: string;
    // ... Stylus AST node types
  }
  ```

- [ ] Create `src/types/rules.ts`:

  ```typescript
  export interface RuleMeta {
    fixable: boolean;
  }

  export interface RuleMessages {
    [key: string]: string;
  }
  ```

### Part 9: Test Build Process

- [ ] Test clean build:
  ```bash
  npm run clean
  npm run build
  ```
- [ ] Verify `lib/` directory created
- [ ] Verify `.d.ts` files generated
- [ ] Verify source maps created
- [ ] Test watch mode: `npm run build:watch`

### Part 10: Update ESLint for TypeScript

- [ ] Install TypeScript ESLint:
  ```bash
  npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
  ```
- [ ] Update `eslint.config.js`:

  ```javascript
  import tsPlugin from "@typescript-eslint/eslint-plugin";
  import tsParser from "@typescript-eslint/parser";

  export default [
    {
      files: ["**/*.ts"],
      languageOptions: {
        parser: tsParser,
        parserOptions: {
          project: "./tsconfig.json",
        },
      },
      plugins: {
        "@typescript-eslint": tsPlugin,
      },
      rules: {
        // TypeScript-specific rules
      },
    },
  ];
  ```

### Part 11: Documentation

- [ ] Document build process in README
- [ ] Add TypeScript section to CONTRIBUTING.md
- [ ] Document type definition usage for consumers
- [ ] Update development workflow docs

## Testing Requirements

- [ ] `npm run build` completes without errors
- [ ] Type checking passes: `npm run type-check`
- [ ] ESLint works with TypeScript files
- [ ] Generated `.d.ts` files are valid
- [ ] Source maps work correctly
- [ ] Watch mode works

## Success Criteria

- [ ] TypeScript compiles successfully
- [ ] Build system functional
- [ ] Type definitions generated
- [ ] CI includes type checking
- [ ] Documentation updated
- [ ] Ready for incremental migration

## Rollback Plan

If major issues:

1. Remove TypeScript dependencies
2. Delete `tsconfig.json`
3. Delete `src/` directory
4. Revert package.json scripts
5. Keep using JavaScript

Low risk as this is additive (doesn't break existing code).

## Notes

### TypeScript Compiler Options Explained

**target: ES2022** - Modern JavaScript (Node 18+ supports this)  
**module: commonjs** - For Node.js compatibility (ESM in Phase 4)  
**strict: true** - All strict type-checking options enabled  
**declaration: true** - Generate .d.ts files  
**sourceMap: true** - For debugging

### Incremental Migration Strategy

1. **Setup** (this issue) - Infrastructure only
2. **Types** (#008) - Type definitions and utilities
3. **Rules** (#009) - Migrate all rules one by one

This allows testing at each step.

### Package Consumers

After migration, consumers get:

- Type definitions (better IDE support)
- Same JavaScript output (no breaking changes)
- Source maps (better debugging)

## Files to Create/Update

**Create:**

- `/tsconfig.json`
- `/tsconfig.test.json`
- `/src/` directory

**Update:**

- `/package.json` - scripts and fields
- `/.gitignore` - compiled output
- `/.github/workflows/NodeCI.yml` - add type checking
- `/eslint.config.js` - TypeScript support
- `/README.md` - build instructions

## Related Issues

- #008 - Utils Migration (next step)
- #009 - Rules Migration (after utils)
- #004 - Vitest Migration (TypeScript tests)

## Next Steps After Completion

Once this issue is complete:

1. Move to #008 (Utils Migration)
2. Start migrating utility files incrementally
3. Build and test after each migration
4. Keep both `lib/` (JS) and `src/` (TS) in sync initially
