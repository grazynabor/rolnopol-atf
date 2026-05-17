import { expect, test } from "@playwright/test";

test("verifies that the page title contains 'Rolnopol' @smoke @regression @ui", async ({
  page,
}) => {
  const response = await page.goto("/");

  expect(response?.ok()).toBeTruthy();
  await expect(page).toHaveTitle(/Rolnopol/);
});

test.describe("Auth smoke tests", () => {
  test("register page is visible and loaded @smoke @auth @ui @critical", async ({
    page,
  }) => {
    const response = await page.goto("/register.html");

    expect(response?.ok()).toBeTruthy(); //czy załadowała się poprawnie

    await expect(page).toHaveURL(/register\.html/); // sprawdza czy url zawiera register
    await expect(page).toHaveTitle(/Rolnopol/); // sprawdza tytuł

    // Main register form
    await expect(page.locator("form")).toBeVisible();

    // Key fields
    await expect(
      page.getByText("Create Your User Account").first(),
    ).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
  });

  test("login page is visible and loaded @smoke @auth @ui @critical", async ({
    page,
  }) => {
    const response = await page.goto("/login.html");

    expect(response?.ok()).toBeTruthy();

    await expect(page).toHaveURL(/login\.html/);
    await expect(page).toHaveTitle(/Rolnopol/);

    // Main login form
    await expect(page.locator("form")).toBeVisible();

    // Key fields
    await expect(page.getByText("User Login & Account Access")).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
  });
});

test("swagger page loads and shows expected text @smoke @api @ui", async ({
  page,
}) => {
  const response = await page.goto("/swagger.html");

  expect(response?.ok()).toBeTruthy();
  await expect(page).toHaveURL(/swagger\.html/);

  await expect(page.locator("#swagger-frame")).toBeVisible();

  const frame = page.frameLocator("#swagger-frame");

  await expect(frame.locator("body")).toContainText(
    "API documentation for the Rolnopol service with versioning support",
  );
});

test("docs page loads and shows expected text @smoke @api @ui", async ({
  page,
}) => {
  const response = await page.goto("/docs.html");

  expect(response?.ok()).toBeTruthy();
  await expect(page).toHaveURL(/docs\.html/);

  await expect(
    page.getByText("Rolnopol System Guide & API Reference"),
  ).toBeVisible();
});
