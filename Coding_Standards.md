# Coding Standards

## General Principles

- Tests should be clear, deterministic, and independent.
- Prefer user-visible behavior over implementation details.
- Keep repeated setup, data creation, and utilities in helpers or factories.
- Use simple patterns consistently before adding new abstractions.

## Guidelines

- Prefer stable Playwright locators such as `getByTestId`, `getByRole`, and `getByLabel`.
- Keep selectors in Page Objects instead of repeating them across tests.
- Keep test data outside Page Objects, for example in `createRegistrationUser()`.
- Use clear names for actions and expectations so the test reads like a user flow.

## Test Structure: AAA

Keep tests in Arrange, Act, Assert order. Add labels only when a longer test needs extra structure:

- Arrange: create data, instantiate Page Objects, and navigate.
- Act: perform the user action or flow under test.
- Assert: verify the expected result in the test file.

```ts
const user = createRegistrationUser();
const registrationPage = new RegistrationPage(page);

const response = await registrationPage.register(user);

expect(response.status()).toBe(201);
await expect(
  registrationPage.successNotification("Registration successful!"),
).toBeVisible();
```

## Page Object Pattern

Page Objects should describe how to interact with a page. Tests should describe what must be verified.

- Page Objects are kept in `src/pages`.
- Do not import `expect` or include assertions inside Page Object files.
- Page Object methods should navigate, perform actions, or return values the test needs.
- Keep page fields and locators `readonly` where possible.
- Keep helper methods private when they are only used inside the Page Object.

## Examples

### Good

```ts
const registerResponse = await registrationPage.register(user);

expect(registerResponse.status()).toBe(201);
await expect(
  registrationPage.successNotification("Registration successful!"),
).toBeVisible();
```

### Avoid

Assertions belong in spec files, not Page Objects:

```ts
await expect(this.successNotification("Registration successful!")).toBeVisible();
```
