import { defineConfig, devices } from "@playwright/test";
// import * as dotenv from "dotenv";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// dotenv.config();
/**
 * See https://playwright.dev/docs/test-configuration.
 */

// !process.env.CI
//   ? dotenv.config({ path: path.resolve(__dirname, "../../.env") })
//   : null;

export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  timeout: 120 * 1000,
  // reporter: [
  //   ["html", { open: "never", outputFolder: "playwright-report/test-results" }],
  // ],
  reporter: "blob",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://localhost:3000/",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  // globalTeardown: require.resolve("./tests/globalTeardown.ts"),

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },
  ],
  /* Run your local dev server before starting the tests */
  webServer: [
    {
      command:
        "poetry run uvicorn --factory langflow.main:create_app --host 127.0.0.1 --port 7860",
      port: 7860,
      env: {
        LANGFLOW_DATABASE_URL: "sqlite:///./temp",
        LANGFLOW_AUTO_LOGIN: "true",
      },
      stdout: "ignore",

      reuseExistingServer: true,
      timeout: 120 * 1000,
    },
    {
      command: "npm start",
      port: 3000,
      env: {
        VITE_PROXY_TARGET: "http://127.0.0.1:7860",
      },
    },
  ],
});
