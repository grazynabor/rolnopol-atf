# rolnopol-atf

Automated end-to-end tests for the Rolnopol application built with Playwright.

## Overview

This repository contains UI and smoke test coverage for key Rolnopol pages and flows. The current suite focuses on:

- home page availability
- registration page and registration flow
- login page and invalid login handling
- Swagger/API documentation page
- system documentation page

The project uses the Page Object Model to keep tests readable and easier to maintain.

## Tech Stack

- Node.js
- npm
- Playwright
- TypeScript

## Prerequisites

Before running the project locally, make sure you have:

- Node.js 18 or newer
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

## Running the Project

Start the local static server manually:

```bash
npm run dev
```

The Playwright configuration also starts the local server automatically when running tests, so in most cases you can go straight to the test commands below.

## Running Tests

Run the full test suite:

```bash
npm test
```

Run tests in headed mode:

```bash
npm run test:headed
```

Open the Playwright UI runner:

```bash
npm run test:ui
```

Run tests in debug mode:

```bash
npm run test:debug
```

Open the HTML report after execution:

```bash
npm run report
```

## Available Scripts

- `npm test` - runs all Playwright tests
- `npm run test:headed` - runs tests with a visible browser
- `npm run test:ui` - opens the Playwright UI runner
- `npm run test:debug` - runs tests in debug mode
- `npm run report` - opens the generated Playwright HTML report
- `npm run codegen` - starts Playwright code generation
- `npm run install:browsers` - installs required Playwright browsers
- `npm run dev` - serves the project locally on `http://localhost:3000`

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
