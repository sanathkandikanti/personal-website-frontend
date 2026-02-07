# Alpine Theme Migration Tests

This directory contains tests for the Alpine theme migration project. The testing strategy combines unit tests and property-based tests to ensure comprehensive coverage.

## Directory Structure

```
tests/
├── unit/           # Unit tests for specific examples and edge cases
├── property/       # Property-based tests using fast-check
├── helpers/        # Shared test utilities and fixtures
└── README.md       # This file
```

## Testing Approach

### Unit Tests (`tests/unit/`)

Unit tests focus on specific examples, edge cases, and integration points:

- Configuration validation (app.config.ts, nuxt.config.ts)
- Content file existence and structure
- Dependency verification (package.json)
- Build integration tests

**Example:**
```typescript
import { describe, it, expect } from 'vitest'

describe('Package Dependencies', () => {
  it('should contain Alpine theme package', () => {
    const pkg = require('../package.json')
    expect(pkg.dependencies).toHaveProperty('@nuxt-themes/alpine')
  })
})
```

### Property-Based Tests (`tests/property/`)

Property-based tests verify universal properties that should hold across all inputs. Each test runs a minimum of 100 iterations using fast-check.

**Properties to test:**
1. Navigation Route Mapping - All navigation items have corresponding content files
2. Content File Frontmatter Completeness - All page content files have required frontmatter
3. Content File Numeric Prefix Ordering - All page content files have numeric prefixes
4. Page Content File Location - All page content files are in /content root
5. Article File Frontmatter Completeness - All article files have required frontmatter
6. Content File Extension Consistency - All content files have .md extension
7. Vuetify Import Elimination - No source files import Vuetify
8. Navigation Route Accessibility - All navigation routes return HTTP 200

**Example:**
```typescript
import { describe, it } from 'vitest'
import * as fc from 'fast-check'

describe('Property: Navigation Route Mapping', () => {
  it('should have content files for all navigation routes', () => {
    fc.assert(
      fc.property(fc.constant(true), () => {
        // Property test logic here
        return true
      }),
      { numRuns: 100 }
    )
  })
})
```

### Test Annotations

Property-based tests must be annotated with:
- Feature name: `alpine-theme-migration`
- Property number and description
- Requirements validation

**Format:**
```typescript
// Feature: alpine-theme-migration, Property 1: Navigation Route Mapping
// Validates: Requirements 4.4
```

## Running Tests

```bash
# Run all tests once
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui
```

## Testing Framework

- **Framework**: Vitest (modern, fast, Vite-native)
- **Property Testing**: fast-check (TypeScript-native property-based testing)
- **Minimum Iterations**: 100 per property test

## Writing Tests

1. **Unit tests**: Place in `tests/unit/` with descriptive names
2. **Property tests**: Place in `tests/property/` with property annotations
3. **Helpers**: Place shared utilities in `tests/helpers/`
4. **Naming**: Use `.test.ts` or `.spec.ts` suffix
5. **Focus**: Test one concept per file for clarity

## Test Coverage

Tests should cover:
- ✅ Dependency management (Vuetify removal, Alpine installation)
- ✅ File structure (old files removed, new files created)
- ✅ Configuration (app.config.ts, nuxt.config.ts)
- ✅ Content files (existence, frontmatter, structure)
- ✅ Build success (compilation, generation)
- ✅ Runtime behavior (navigation, routing)

## Notes

- Tests may reveal bugs in the code - don't assume code is always correct
- If tests reveal confusing behavior not covered in specs, ask for clarification
- All tests must pass before completing migration tasks
- Property tests use randomization to find edge cases
