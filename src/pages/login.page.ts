import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { PAGE_URLS } from "./page-urls";

/**
 * Page object for login form locators used by auth smoke tests.
 */
export class LoginPage extends BasePage {
  static readonly URL = PAGE_URLS.login;

  readonly form: Locator;
  readonly subtitle: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;

  constructor(page: Page) {
    super(page, LoginPage.URL);

    this.form = page.getByTestId("login-form");
    this.subtitle = page.getByTestId("login-subtitle");
    this.emailInput = page.getByTestId("email-input");
    this.passwordInput = page.getByTestId("password-input");
  }
}
