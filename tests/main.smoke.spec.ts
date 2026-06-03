import { expect, type Response, test } from "@playwright/test";
import { createRegistrationUser } from "../src/helpers";
import { RegistrationPage } from "../src/pages";


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
  heading: "Create Your User Account",
};

const LOGIN_PAGE = {
  url: /login\.html/,
  heading: "User Login & Account Access",
};

const SWAGGER_PAGE = {
  url: /swagger\.html/,
  frame: "#swagger-frame",
  expectedText:
    "API documentation for the Rolnopol service with versioning support",
};

const DOCS_PAGE = {
  url: /docs\.html/,
  subtitle: "Rolnopol System Guide & API Reference",
};

function expectPageLoaded(response: Awaited<ReturnType<any>>) {
  expect(response, "Page response should exist").not.toBeNull();
  expect(response!.ok()).toBeTruthy();
}

test("verifies that the page title contains 'Rolnopol' @smoke @regression @ui", async ({
  page,
}) => {
  const response = await page.goto("/");

  expectPageLoaded(response);

  await expect(page).toHaveTitle(PAGE_TITLE);
  await expect(page.locator("body")).toContainText("Rolnopol");
});

test.describe("Auth smoke tests", () => {
  test("register page is visible and loaded @smoke @auth @registration @ui @critical", async ({
    page,
  }) => {
    const registrationPage = new RegistrationPage(page);

    const response = await registrationPage.goto();

    expectPageLoaded(response);

    await expect(page).toHaveURL(REGISTER_PAGE.url);
    await expect(page).toHaveTitle(PAGE_TITLE);
    await expect(registrationPage.form).toBeVisible();
    await expect(registrationPage.subtitle).toBeVisible();
    await expect(registrationPage.subtitle).toContainText(
      REGISTER_PAGE.heading,
    );
    await expect(registrationPage.emailInput).toBeVisible();
    await expect(registrationPage.displayNameInput).toBeVisible();
    await expect(registrationPage.passwordInput).toBeVisible();
  });

  test("registers a new user with required data @smoke @regression @auth @registration @ui @critical", async ({
    page,
  }) => {
    const registrationPage = new RegistrationPage(page);
    const user = createRegistrationUser();

    const response = await registrationPage.goto();

    expectPageLoaded(response);

    const registerResponse = await registrationPage.register(user);
    const successNotification = registrationPage.successNotification(
      REGISTER_SUCCESS_NOTIFICATION.message,
    );

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
});

  test("login page is visible and loaded @smoke @auth @ui @critical", async ({
    page,
  }) => {
    const response = await page.goto("/login.html");

    expectPageLoaded(response);

    await expect(page).toHaveURL(LOGIN_PAGE.url);
    await expect(page).toHaveTitle(PAGE_TITLE);

    await expect(page.locator("form")).toBeVisible();

    await expect(page.getByText(LOGIN_PAGE.heading)).toBeVisible();

    await expect(page.getByLabel(/email/i)).toBeVisible();

    await expect(page.getByLabel(/^password$/i)).toBeVisible();
  });

test("swagger page loads and shows expected text @smoke @api @ui", async ({
  page,
}) => {
  const response = await page.goto("/swagger.html");

  expectPageLoaded(response);

  await expect(page).toHaveURL(SWAGGER_PAGE.url);

  await expect(page.locator(SWAGGER_PAGE.frame)).toBeVisible();

  const frame = page.frameLocator(SWAGGER_PAGE.frame);

  await expect(frame.locator("body")).toContainText(SWAGGER_PAGE.expectedText);
});

test("docs page loads and shows expected text @smoke @api @ui", async ({
  page,
}) => {
  const response = await page.goto("/docs.html");

  expectPageLoaded(response);

  await expect(page).toHaveURL(DOCS_PAGE.url);

  await expect(page.locator(".docs-header-subtitle")).toContainText(
    DOCS_PAGE.subtitle,
  );
});
