import { test, expect } from "@playwright/test";

test("sign-in page has title and necessary elements", async ({ page }) => {
  // Navigate to the specified URL
  await page.goto("/");

  await page.waitForSelector(".cl-header");

  // Check that the page has the correct title
  await expect(page).toHaveTitle("My account | Moonsync");

  // Check for the "Continue with Google" button
  const googleSignInButton = page.locator("text=Continue with Google");
  await expect(googleSignInButton).toBeVisible();

  // Check for the "Continue" button
  const continueButton = page.getByRole("button", {
    name: "Continue",
    exact: true,
  });
  await expect(continueButton).toBeVisible();

  // Optionally, check for the "Sign up" link
  const signUpLink = page.getByRole("link", { name: "Sign up", exact: true });
  await expect(signUpLink).toBeVisible();
});
