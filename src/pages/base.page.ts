import { type Page, type Response } from "@playwright/test";
import { type PageUrl } from "./page-urls";

export abstract class BasePage {
  protected constructor(
    protected readonly page: Page,
    private readonly url: PageUrl,
  ) {}

  async goto(): Promise<Response | null> {
    return this.page.goto(this.url, { waitUntil: "domcontentloaded" });
  }
}
