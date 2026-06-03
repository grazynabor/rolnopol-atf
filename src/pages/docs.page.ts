import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class DocsPage extends BasePage {
  static readonly URL = "/docs.html";

  constructor(page: Page) {
    super(page, DocsPage.URL);
  }

  subtitle(text: string): Locator {
    return this.page.getByText(text, { exact: true });
  }
}
