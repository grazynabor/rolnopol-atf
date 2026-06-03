import { expect, type Response, test } from "@playwright/test";
import { createRegistrationUser } from "../src/helpers";
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

function expectPageLoaded(response: Response | null) {
  expect(response, "Page response should exist").not.toBeNull();
  expect(response!.ok()).toBeTruthy();
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

function expectPageLoaded(response: Awaited<ReturnType<any>>) {
  expect(response, "Page response should exist").not.toBeNull();
  expect(response?.ok(), "Page response should be successful").toBe(true);
}

test("verifies that the page title contains 'Rolnopol' @smoke @regression @ui", async ({
  page,
}) => {
  // Arrange
  const homePage = new HomePage(page);

  // Act
  const response = await homePage.goto();

  // Assert
  expectPageLoaded(response);

  await expect(page).toHaveTitle(PAGE_TITLE);
});

test.describe("Auth smoke tests", () => {
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

  test("login page is visible and loaded @smoke @auth @ui @critical", async ({
    page,
  }) => {
    // Arrange
    const loginPage = new LoginPage(page);

    // Act
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
});

test("swagger page loads and shows expected text @smoke @api @ui", async ({
  page,
}) => {
  // Arrange
  const swaggerPage = new SwaggerPage(page);

  // Act
  const response = await swaggerPage.goto();

  // Assert
  expectPageLoaded(response);

  await expect(page).toHaveURL(SWAGGER_PAGE.url);
  await expect(swaggerPage.frame).toBeVisible();
  await expect(swaggerPage.documentationContent()).toContainText(
    SWAGGER_PAGE.expectedText,
  );
});

test("docs page loads and shows expected text @smoke @api @ui", async ({
  page,
}) => {
  // Arrange
  const docsPage = new DocsPage(page);

  // Act
  const response = await docsPage.goto();

  // Assert
  expectPageLoaded(response);

  await expect(page).toHaveURL(DOCS_PAGE.url);
  await expect(docsPage.subtitle(DOCS_PAGE.subtitle)).toBeVisible();
});
