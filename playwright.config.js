import { defineConfig, devices } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

// Use process.env.PORT by default and fallback to port 3000
const PORT = process.env.PORT || 3000;

// Set webServer.url and use.baseURL with the location of the WebServer respecting the correct set port
const baseURL = `http://localhost:${PORT}`;

// Get the directory name of the current module
const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // Timeout per test
  timeout: 30 * 1000,

  // Test directory
  testDir: path.join(dirname, "tests/playwright"),

  expect: {
    timeout: 5000,
  },

  // If a test fails, retry it additional 3 times
  retries: 3,

  reporter: [
    ["list"],
    ["junit", { outputFile: "test-results/results.xml" }],
    ["html"],
  ],

  use: {
    actionTimeout: 0,
    // Use baseURL so to make navigations relative.
    // More information: https://playwright.dev/docs/api/class-testoptions#test-options-base-url
    baseURL,

    // Retry a test if its failing with enabled tracing. This allows you to analyze the DOM, console logs, network traffic etc.
    // More information: https://playwright.dev/docs/trace-viewer
    trace: "retry-with-trace",

    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  webServer: {
    command: "pnpm dev",
    url: baseURL,
    timeout: 300 * 1000,
    reuseExistingServer: !process.env.CI,
  },

  projects: [
    {
      name: "Chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
