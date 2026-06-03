import {
  type FrameLocator,
  type Locator,
  type Page,
} from "@playwright/test";
import { BasePage } from "./base.page";

export class SwaggerPage extends BasePage {
  static readonly URL = "/swagger.html";

  readonly frame: Locator;

  private readonly swaggerFrame: FrameLocator;

  constructor(page: Page) {
    super(page, SwaggerPage.URL);

    this.frame = page.getByTitle("Swagger API Documentation");
    this.swaggerFrame = page.frameLocator(
      'iframe[title="Swagger API Documentation"]',
    );
  }

  documentationContent(): Locator {
    return this.swaggerFrame.locator("body");
  }
}
