import { type Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
  static readonly URL = "/";

  constructor(page: Page) {
    super(page, HomePage.URL);
  }
}
