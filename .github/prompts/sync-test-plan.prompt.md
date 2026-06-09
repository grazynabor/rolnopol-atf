---
name: sync-test-plan
description: Compare Test_Plan.md with tests and source files, then report coverage mismatches.
agent: agent
---

<!-- Tip: Use /create-prompt in chat to generate content with agent assistance -->

Review [Test_Plan.md](../../Test_Plan.md) against tests in [tests](../../tests) and source files in [src](../../src).
A match means every item is covered by at least one test and no requirement is contradicted.

Return bullet mismatches with:
- the item
- current status
- corrective action

If [Test_Plan.md](../../Test_Plan.md) or the test suite is missing, respond with:
`Unable to verify because the Test_Plan file or test suite is missing.`
