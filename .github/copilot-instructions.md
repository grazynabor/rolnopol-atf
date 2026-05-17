# Conventional Commits

Always use conventional commit format for consistent commit messages.

## Format

type: description

## Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes
- **refactor**: Code refactoring
- **test**: Adding or fixing tests
- **chore**: Maintenance tasks

## Description

- Use imperative mood (e.g., "add" not "added")
- Keep it short and start with lowercase

## Examples

- feat: add login functionality
- fix: resolve button alignment issue
- test: add unit tests for user service

## Test Plan and Tagging System

When creating Playwright tests, always use tags from the `## Test Plan and Tagging System` reference.

### Rules

- Every Playwright test must include relevant tags.
- Tags must be added directly in the test title.
- Keep tags synchronized with the current Test Plan.
- Keep this reference updated whenever tags are added or modified.

### Example

```ts
test(
  "user can login successfully @smoke @auth @ui @critical",
  async ({ page }) => {
    // test code
  }
);

## Playwright Test Framework

This repository uses the Playwright test framework for end-to-end and UI tests. When creating Playwright tests, review `playwright.config.ts` to ensure test settings (such as `baseURL`, timeouts, projects, and tracing) match the test's intent and your environment.

Keep `playwright.config.ts` under review whenever adding or modifying tests to avoid flaky runs or incorrect assumptions about the test environment.
```
S