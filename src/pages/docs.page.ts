import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { PAGE_URLS } from "./page-urls";

export class DocsPage extends BasePage {
  static readonly URL = PAGE_URLS.docs;

  constructor(page: Page) {
    super(page, DocsPage.URL);
  }

  subtitle(text: string): Locator {
    return this.page.getByText(text, { exact: true });
  }
}
