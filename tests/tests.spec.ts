import { test, expect } from "@playwright/test";
import { ListingPage } from "../pages/listingPage";

let listingPage: ListingPage;

test.beforeEach(async ({ page }) => {
  listingPage = new ListingPage(page);
  await listingPage.goto();
  await expect(page).toHaveTitle(/DEMOQA/);
});

test("Scenario 1: Search for a Book and Validate Results", async ({ page }) => {
  const bookTitle = "JavaScript";

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

test("Scenario 3: Validate Pagination Functionality", async ({ page }) => {
  let firstPageTitles: string[] = [];
  let secondPageTitles: string[] = [];
  let firstPageTitlesAgain: string[] = [];

  await test.step("Enable pagination", async () => {
    await expect(listingPage.bookList).toBeVisible();
    await listingPage.selectRowsPerPage('5');
    await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();
  });

  await test.step("Save results from first page", async () => {
    firstPageTitles = await listingPage.getBookTitles();
    expect(firstPageTitles.length).toBeGreaterThan(0);
  });

  await test.step("Go to second page", async () => {
    await listingPage.goToNextPage();
    await expect(page.getByRole('button', { name: 'Previous' })).toBeEnabled();
    secondPageTitles = await listingPage.getBookTitles();
    expect(secondPageTitles.length).toBeGreaterThan(0);
  });

  await test.step("Validate first page has different books than second page", async () => {
    expect(secondPageTitles).not.toEqual(firstPageTitles);
  });

  await test.step("Go back to first page", async () => {
    await listingPage.goToPreviousPage();
    await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();
  });

  await test.step("Save results on first page", async () => {
    firstPageTitlesAgain = await listingPage.getBookTitles();
    expect(firstPageTitlesAgain.length).toBeGreaterThan(0);
  });

  await test.step("Validate the results on first page are the same", async () => {
    expect(firstPageTitlesAgain).toEqual(firstPageTitles);
  });
});