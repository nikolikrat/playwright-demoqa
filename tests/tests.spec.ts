import { test, expect } from "@playwright/test";
import { ListingPage } from "../pages/listingPage";

test("Scenario 1: Search for a Book and Validate Results", async ({ page }) => {
  const listingPage = new ListingPage(page);
  const bookTitle = "JavaScript";

  await test.step("Navigate to the books page", async () => {
    await listingPage.goto();
    await expect(page).toHaveTitle(/DEMOQA/);
  });

  await test.step("Enter a book title in the search input field", async () => {
    await listingPage.searchBook(bookTitle);
    await expect(listingPage.searchBox).toHaveValue(bookTitle);
  });

  await test.step("Result list shows at least one book and contains the searched title", async () => {
    await expect(listingPage.bookList).toBeVisible();
    const countValidResults = await listingPage.bookActionItem.filter({ hasText: bookTitle }).count();
    expect(countValidResults).toBeGreaterThan(0);
  });

  await test.step("Irrelevant books do not appear in results", async () => {
    await expect(listingPage.bookActionItem.filter({ hasNotText: bookTitle })).not.toBeVisible();
  });
});