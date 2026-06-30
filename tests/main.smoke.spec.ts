import { expect, type Page, type Response, test } from "@playwright/test";
import { createRegistrationUser, createUniqueEmail } from "../src/helpers";
import {
  DocsPage,
  HomePage,
  LoginPage,
  RegistrationPage,
  SwaggerPage,
} from "../src/pages";

const REGISTER_SUCCESS_NOTIFICATION = {
  title: "Success",
  message: "Registration successful!",
};

const REGISTER_DUPLICATE_NOTIFICATION = {
  title: "Error",
  message: "User with this email already exists",
};

const LOGIN_INVALID_CREDENTIALS_NOTIFICATION = {
  title: "Error",
  message: "Invalid credentials",
};

/**
 * Shared smoke assertion for route loads before page-specific expectations.
 */
function expectPageLoaded(response: Response | null) {
  expect(response, "Page response should exist").not.toBeNull();
  expect(response!.ok()).toBeTruthy();
}

async function expectNoRegisterRequestDuring(
  page: Page,
  action: () => Promise<void>,
) {
  const registerRequestPromise = page
    .waitForRequest(
      (request) =>
        request.url().includes("/api/v1/register") &&
        request.method() === "POST",
      { timeout: 1000 },
    )
    .then(() => true)
    .catch(() => false);

  await action();

  expect(await registerRequestPromise).toBe(false);
}

const PAGE_TITLE = /Rolnopol/;

const REGISTER_PAGE = {
  url: /register\.html/,
  subtitle: "Create Your User Account",
};

const LOGIN_PAGE = {
  url: /login\.html/,
  subtitle: "User Login & Account Access",
};

const SWAGGER_PAGE = {
  url: /swagger\.html/,
  expectedText:
    "API documentation for the Rolnopol service with versioning support",
};

const DOCS_PAGE = {
  url: /docs\.html/,
  subtitle: "Rolnopol System Guide & API Reference",
};

test.beforeEach(async ({ page }) => {
  await page.route("https://cdnjs.cloudflare.com/**", (route) => route.abort());
});

test.describe("Basic application smoke tests", () => {
  test("verifies that the page title contains 'Rolnopol' @smoke @regression @ui", async ({
    page,
  }) => {
    const homePage = new HomePage(page);

    const response = await homePage.goto();

    // Assert
    expectPageLoaded(response);

    await expect(page).toHaveTitle(PAGE_TITLE);
  });
});

test.describe("Registration tests", () => {
  test("register page is visible and loaded @smoke @auth @registration @ui @critical", async ({
    page,
  }) => {
    // Arrange
    const registrationPage = new RegistrationPage(page);

    // Act
    const response = await registrationPage.goto();

    // Assert
    expectPageLoaded(response);

    await expect(page).toHaveURL(REGISTER_PAGE.url);
    await expect(page).toHaveTitle(PAGE_TITLE);
    await expect(registrationPage.form).toBeVisible();
    await expect(registrationPage.subtitle).toBeVisible();
    await expect(registrationPage.subtitle).toContainText(
      REGISTER_PAGE.subtitle,
    );
    await expect(registrationPage.emailInput).toBeVisible();
    await expect(registrationPage.displayNameInput).toBeVisible();
    await expect(registrationPage.passwordInput).toBeVisible();
  });

  test("register page shows login link @demo @auth @registration @ui", async ({
    page,
  }) => {
    // Arrange
    const registrationPage = new RegistrationPage(page);
    const response = await registrationPage.goto();

    expectPageLoaded(response);

    // Assert
    const loginLink = page.getByTestId("login-link");
    await expect(loginLink).toBeVisible();
    await expect(loginLink).toHaveAttribute("href", "/login.html");
  });

  test("registers a new user with required data @smoke @regression @auth @registration @ui @critical", async ({
    page,
  }) => {
    // Arrange
    const registrationPage = new RegistrationPage(page);
    const user = createRegistrationUser();
    const response = await registrationPage.goto();

    expectPageLoaded(response);

    // Act
    const registerResponse = await registrationPage.register(user);
    const successNotification = registrationPage.successNotification(
      REGISTER_SUCCESS_NOTIFICATION.message,
    );

    // Assert
    expect(registerResponse.status()).toBe(201);
    await expect(successNotification).toBeVisible();
    await expect(successNotification).toContainText(
      REGISTER_SUCCESS_NOTIFICATION.title,
    );
    await expect(successNotification).toContainText(
      REGISTER_SUCCESS_NOTIFICATION.message,
    );
    await expect(page).toHaveURL(LOGIN_PAGE.url);
  });

  test("rejects invalid email format @regression @auth @registration @ui @negative", async ({
    page,
  }) => {
    // Arrange
    const registrationPage = new RegistrationPage(page);
    const response = await registrationPage.goto();

    expectPageLoaded(response);

    await registrationPage.fillForm({
      email: "incorrect-email",
      password: "Test#123Aa1",
    });

    // Act
    await expectNoRegisterRequestDuring(page, () => registrationPage.submit());

    // Assert
    expect(
      await registrationPage.emailInput.evaluate(
        (input: HTMLInputElement) => input.validity.typeMismatch,
      ),
    ).toBe(true);
    await expect(page).toHaveURL(REGISTER_PAGE.url);
  });

  test("rejects too short password @regression @auth @registration @ui @negative", async ({
    page,
  }) => {
    // Arrange
    const registrationPage = new RegistrationPage(page);
    const response = await registrationPage.goto();

    expectPageLoaded(response);

    await registrationPage.fillForm({
      email: createUniqueEmail("short-password-registration"),
      password: "ab",
    });

    // Act
    await expectNoRegisterRequestDuring(page, () => registrationPage.submit());

    // Assert
    expect(
      await registrationPage.passwordInput.evaluate(
        (input: HTMLInputElement) => input.validity.tooShort,
      ),
    ).toBe(true);
    await expect(page).toHaveURL(REGISTER_PAGE.url);
  });

  test("blocks duplicate user registration @regression @auth @registration @ui @negative", async ({
    page,
    request,
  }) => {
    // Arrange
    const registrationPage = new RegistrationPage(page);
    const timestamp = Date.now().toString();
    const user = {
      email: createUniqueEmail("duplicate-registration", timestamp),
      password: `Test#${timestamp.slice(-6)}Aa1`,
    };
    const seedResponse = await request.post("/api/v1/register", {
      data: user,
    });
    const response = await registrationPage.goto();

    expect(seedResponse.status()).toBe(201);
    expectPageLoaded(response);

    // Act
    const registerResponse = await registrationPage.register(user);
    const errorNotification = registrationPage.errorNotification(
      REGISTER_DUPLICATE_NOTIFICATION.message,
    );

    // Assert
    expect(registerResponse.status()).toBe(409);
    await expect(page).toHaveURL(REGISTER_PAGE.url);
    await expect(errorNotification).toBeVisible();
    await expect(errorNotification).toContainText(
      REGISTER_DUPLICATE_NOTIFICATION.title,
    );
    await expect(errorNotification).toContainText(
      REGISTER_DUPLICATE_NOTIFICATION.message,
    );
  });
});

test.describe("Login tests", () => {
  test("login page is visible and loaded @smoke @auth @ui @critical", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    const response = await loginPage.goto();

    // Assert
    expectPageLoaded(response);

    await expect(page).toHaveURL(LOGIN_PAGE.url);
    await expect(page).toHaveTitle(PAGE_TITLE);
    await expect(loginPage.form).toBeVisible();
    await expect(loginPage.subtitle).toContainText(LOGIN_PAGE.subtitle);
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
  });

  test("rejects invalid login credentials @regression @auth @ui @negative", async ({
    page,
  }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const response = await loginPage.goto();

    expectPageLoaded(response);

    // Act
    const loginResponse = await loginPage.login({
      email: createUniqueEmail("invalid-login"),
      password: "WrongPassword123!",
    });
    const errorNotification = loginPage.errorNotification(
      LOGIN_INVALID_CREDENTIALS_NOTIFICATION.message,
    );

    // Assert
    expect(loginResponse.status()).toBe(401);
    await expect(page).toHaveURL(LOGIN_PAGE.url);
    await expect(errorNotification).toBeVisible();
    await expect(errorNotification).toContainText(
      LOGIN_INVALID_CREDENTIALS_NOTIFICATION.title,
    );
    await expect(errorNotification).toContainText(
      LOGIN_INVALID_CREDENTIALS_NOTIFICATION.message,
    );
  });
});

test.describe("Swagger documentation tests", () => {
  test("swagger page loads and shows expected text @smoke @api @ui", async ({
    page,
  }) => {
    const swaggerPage = new SwaggerPage(page);

    const response = await swaggerPage.goto();

    // Assert
    expectPageLoaded(response);

    await expect(page).toHaveURL(SWAGGER_PAGE.url);
    await expect(swaggerPage.frame).toBeVisible();
    await expect(swaggerPage.documentationContent()).toContainText(
      SWAGGER_PAGE.expectedText,
    );
  });
});

test.describe("System documentation tests", () => {
  test("docs page loads and shows expected text @smoke @api @ui", async ({
    page,
  }) => {
    const docsPage = new DocsPage(page);

    const response = await docsPage.goto();

    // Assert
    expectPageLoaded(response);

    await expect(page).toHaveURL(DOCS_PAGE.url);
    await expect(docsPage.subtitle(DOCS_PAGE.subtitle)).toBeVisible();
  });
});
