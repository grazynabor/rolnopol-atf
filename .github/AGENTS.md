# Codex Instructions

## Conventional Commits

Use conventional commit format for commit messages.

Format:

```text
type: description
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or fixing tests
- `chore`: Maintenance tasks

Description rules:

- Use imperative mood, for example `add` instead of `added`.
- Keep the description short.
- Start the description with a lowercase letter.

Examples:

- `feat: add login functionality`
- `fix: resolve button alignment issue`
- `test: add registration smoke coverage`

## Test Plan and Tags

`Test_Plan.md` is the source of truth for Playwright test scenarios and tags.

Rules:

- Every Playwright test must include relevant tags directly in the test title.
- Keep tags aligned with the exact scenario in `Test_Plan.md`.
- Use only tags listed in the `Test Tags Convention` table unless `Test_Plan.md` is updated in the same change.
- When adding a new scenario, update `Test_Plan.md` with the scenario and its tags.
- When changing tags in a test, update `Test_Plan.md` if the plan no longer matches.
- Prefer keeping one scenario's tag set consistent across related assertions.

Current tags from `Test_Plan.md`:

| Tag | Purpose |
| --- | --- |
| `@smoke` | Critical happy-path validation |
| `@regression` | Full regression coverage |
| `@auth` | Authentication-related tests |
| `@farm` | Farm management module |
| `@marketplace` | Marketplace module |
| `@finance` | Financial operations |
| `@permissions` | Authorization/access control |
| `@api` | API-level validation |
| `@ui` | UI/E2E interaction |
| `@negative` | Negative/error scenarios |
| `@critical` | High business impact |
| `@healthcheck` | System health tests |

Example:

```ts
test("user can login successfully @smoke @regression @auth @ui @critical", async ({
  page,
}) => {
  // test code
});
```

## Playwright Test Framework

This repository uses Playwright for end-to-end and UI tests.

Before adding or modifying tests:

- Review `playwright.config.ts` for `baseURL`, timeout, project, reporter, and trace settings.
- Keep selectors stable and user-facing where possible, using `getByRole`, `getByLabel`, and `getByTestId`.
- Use unique test data for flows that create records, such as registration.
- Assert visible UI feedback when the workflow shows it, especially success or error notifications.
- Keep tests scoped to the scenario they cover and avoid broad unrelated assertions.

Useful commands:

```bash
npx playwright test
npx playwright test -g "test title"
npx playwright test -g "test title" --trace on
npx playwright show-report
```
