import { type Locator, type Page, type Response } from "@playwright/test";
import { BasePage } from "./base.page";
import { PAGE_URLS } from "./page-urls";

export type RegistrationUser = {
  email: string;
  displayName?: string;
  password: string;
};

export class RegistrationPage extends BasePage {
  static readonly URL = PAGE_URLS.registration;

  readonly form: Locator;
  readonly subtitle: Locator;
  readonly emailInput: Locator;
  readonly displayNameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page, RegistrationPage.URL);

    this.form = page.getByTestId("register-form");
    this.subtitle = page.getByTestId("register-subtitle");
    this.emailInput = page.getByTestId("email-input");
    this.displayNameInput = page.getByTestId("display-name-input");
    this.passwordInput = page.getByTestId("password-input");
    this.submitButton = page.getByTestId("register-submit-btn");
  }

  async register(user: RegistrationUser): Promise<Response> {
    await this.fillForm(user);

    const registerResponsePromise = this.page.waitForResponse(
      (registerResponse) =>
        registerResponse.url().includes("/api/v1/register") &&
        registerResponse.request().method() === "POST",
    );

    await this.submitButton.click();

    return registerResponsePromise;
  }

  successNotification(message: string): Locator {
    return this.page.getByRole("alert").filter({ hasText: message });
  }

  private async fillForm(user: RegistrationUser) {
    await this.emailInput.fill(user.email);
    if (user.displayName) {
      await this.displayNameInput.fill(user.displayName);
    }
    await this.passwordInput.fill(user.password);
  }
}
