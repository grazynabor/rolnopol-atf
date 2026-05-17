import { expect, test } from "@playwright/test";

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
});

test.describe("Auth smoke tests", () => {
  test("register page is visible and loaded @smoke @auth @ui @critical", async ({
    page,
  }) => {
    const response = await page.goto("/register.html");

    expectPageLoaded(response);

    await expect(page).toHaveURL(REGISTER_PAGE.url);
    await expect(page).toHaveTitle(PAGE_TITLE);

    await expect(page.getByTestId("register-form")).toBeVisible();

    await expect(page.getByTestId("register-subtitle")).toBeVisible();

    await expect(page.getByTestId("email-input")).toBeVisible();

    await expect(page.getByTestId("password-input")).toBeVisible();
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