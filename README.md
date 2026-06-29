# rolnopol-atf

Automated end-to-end tests for the Rolnopol application built with Playwright.

## Quick Start

**Requirements:** Node.js 18 LTS or later, npm (bundled with Node.js), Chromium (installed in step 2).

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers
npm run install:browsers

# 3. Run all tests
npm test
```

HTML results are saved to `playwright-report/`. Open them with `npm run report`.

## Test Examples

```bash
# Run all tests (headless, Chromium)
npm test

# Run with a visible browser
npm run test:headed

# Run only smoke tests
npx playwright test --grep @smoke

# Run a specific test file
npx playwright test tests/home.spec.ts

# Open the interactive UI runner
npm run test:ui

# Debug a failing test step by step
npm run test:debug
```

## All Commands

| Command | Description |
|---|---|
| `npm test` | Run all tests (headless) |
| `npm run test:headed` | Run tests with a visible browser |
| `npm run test:ui` | Open the Playwright UI runner |
| `npm run test:debug` | Run tests in debug mode |
| `npm run report` | Open the generated HTML report |
| `npm run codegen` | Start Playwright code generation |
| `npm run install:browsers` | Install required Playwright browsers |
| `npm run dev` | Serve the app locally on `http://localhost:3000` |

> The Playwright configuration starts the local dev server automatically during test runs, so `npm run dev` is mainly useful for manual checks.

## Project Structure

```
tests/              # test specifications
src/pages/          # page object models
src/helpers/        # utilities and test data builders
playwright.config.ts
```

## Tech Stack

- Node.js 18 LTS+
- npm
- Playwright (TypeScript)
- Chromium

## Related Documentation

- [Test_Plan.md](./Test_Plan.md) – test scope, scenarios, and tag reference
- [Coding_Standards.md](./Coding_Standards.md) – coding rules and conventions
