import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";
const resultsRoot = "test-result";
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "./tests",
  timeout: 10 * 1000,
  fullyParallel: true,
  outputDir: `${resultsRoot}/test-results`,
  preserveOutput: "always",
  reporter: [["html", { open: "never", outputFolder: "playwright-report", doNotInlineAssets: true }]],
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: "npm run dev",
        url: baseURL,
        reuseExistingServer: true,
        timeout: 30 * 1000,
      },
  use: {
    baseURL,
    trace: isCI ? "on-first-retry" : "on",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
