# rolnopol-atf

Automated end-to-end tests for the Rolnopol application built with Playwright.

## Overview

This repository contains end-to-end and smoke tests for the Rolnopol application.
The suite is organized around reusable page objects and supporting helpers to keep test code readable and easier to maintain.

For the current test scope, scenarios, and tagging strategy, see [Test_Plan.md](./Test_Plan.md).

## Tech Stack

- Node.js
- npm
- Playwright
- TypeScript

## Prerequisites

Before running the project locally, make sure you have:

- a recent LTS version of Node.js
- npm

## Installation

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npm run install:browsers
```

## Common Commands

- `npm run dev` - serves the project locally on `http://localhost:3000`
- `npm test` - runs all Playwright tests
- `npm run test:headed` - runs tests with a visible browser
- `npm run test:ui` - opens the Playwright UI runner
- `npm run test:debug` - runs tests in debug mode
- `npm run report` - opens the generated Playwright HTML report
- `npm run codegen` - starts Playwright code generation
- `npm run install:browsers` - installs required Playwright browsers

The Playwright configuration starts the local server automatically when running tests, so `npm run dev` is mainly useful for manual checks.

## Project Structure

- `tests/` - end-to-end and smoke test specifications
- `src/pages/` - page object models and page URL helpers
- `src/helpers/` - helper utilities and test data builders
- `playwright.config.ts` - Playwright configuration
- `Test_Plan.md` - planned scope and tagging strategy for tests
- `Coding_Standards.md` - project coding rules and conventions

## Notes

- The test suite currently runs in Chromium.
- HTML reports are generated in `playwright-report/`.
- Additional test artifacts may appear in `test-results/`.

## Related Documentation

- [Test_Plan.md](./Test_Plan.md)
- [Coding_Standards.md](./Coding_Standards.md)
