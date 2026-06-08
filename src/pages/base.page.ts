import { type Page, type Response } from "@playwright/test";
import { type PageUrl } from "./page-urls";

/**
 * Shared base for page objects that own a single route and common navigation.
 */
export abstract class BasePage {
  protected constructor(
    protected readonly page: Page,
    private readonly url: PageUrl,
  ) {}

  /**
   * Uses the same readiness point for every page-level smoke check.
   */
  async goto(): Promise<Response | null> {
    return this.page.goto(this.url, { waitUntil: "domcontentloaded" });
  }
}
