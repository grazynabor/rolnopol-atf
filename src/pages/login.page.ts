import { type Locator, type Page, type Response } from "@playwright/test";
import { BasePage } from "./base.page";
import { PAGE_URLS } from "./page-urls";

/**
 * Test data accepted by the login form.
 */
export type LoginCredentials = {
  email: string;
  password: string;
};

/**
 * Page object for login form locators used by auth smoke tests.
 */
export class LoginPage extends BasePage {
  static readonly URL = PAGE_URLS.login;

  readonly form: Locator;
  readonly subtitle: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page, LoginPage.URL);

    this.form = page.getByTestId("login-form");
    this.subtitle = page.getByTestId("login-subtitle");
    this.emailInput = page.getByTestId("email-input");
    this.passwordInput = page.getByTestId("password-input");
    this.submitButton = page.getByTestId("login-submit-btn");
  }

  /**
   * Arms the API wait before submit so fast login responses are captured.
   */
  async login(credentials: LoginCredentials): Promise<Response> {
    await this.fillForm(credentials);

    const loginResponsePromise = this.page.waitForResponse(
      (loginResponse) =>
        loginResponse.url().includes("/api/v1/login") &&
        loginResponse.request().method() === "POST",
    );

    await this.submitButton.click();

    return loginResponsePromise;
  }

  errorNotification(message: string): Locator {
    return this.page.getByRole("alert").filter({ hasText: message });
  }

  async fillForm(credentials: LoginCredentials): Promise<void> {
    await this.emailInput.fill(credentials.email);
    await this.passwordInput.fill(credentials.password);
  }
}
