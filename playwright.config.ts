import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";
const resultsRoot = "test-result";
const isCI = !!process.env.CI;
const reportFolder = isCI ? "playwright-report-ci" : "playwright-report";

export default defineConfig({
  testDir: "./tests",
  timeout: isCI ? 20 * 1000 : 10 * 1000,
  fullyParallel: !isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  outputDir: `${resultsRoot}/test-results`,
  preserveOutput: "always",
  reporter: [["html", { open: "never", outputFolder: reportFolder, doNotInlineAssets: true }]],
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
    trace: "on",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
