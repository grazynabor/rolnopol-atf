import { type Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { PAGE_URLS } from "./page-urls";

export class HomePage extends BasePage {
  static readonly URL = PAGE_URLS.home;

  constructor(page: Page) {
    super(page, HomePage.URL);
  }
}
