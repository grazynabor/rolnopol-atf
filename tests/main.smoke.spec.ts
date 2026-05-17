import { expect, test } from "@playwright/test";

test("verifies that the page title contains 'Rolnopol' @smoke @regression @ui", async ({
  page,
}) => {
  await page.goto("");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Rolnopol/);
});

test.describe("Auth smoke tests", () => {
  test("register page is visible and loaded @smoke @auth @ui @critical", async ({
    page,
  }) => {
    const response = await page.goto("/register.html");

    expect(response?.ok()).toBeTruthy();

    await expect(page).toHaveURL(/register\.html/);
    await expect(page).toHaveTitle(/Rolnopol/);

    // Main register form
    await expect(page.locator("form")).toBeVisible();

    // Key fields
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
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
  });
});
