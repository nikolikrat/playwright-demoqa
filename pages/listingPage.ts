
import { Page, Locator, expect } from '@playwright/test';

export class ListingPage {
  readonly page: Page;
  readonly landingPage: Locator;
  readonly searchBox: Locator;
  readonly bookList: Locator;
  readonly bookActionItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.landingPage = page.locator('#app')
    this.searchBox = page.locator('#searchBox')
    this.bookList = page.getByRole('grid').locator('.rt-tbody');
    this.bookActionItem = this.bookList.locator(".action-buttons")
  }

  async goto() {
    await this.page.goto('https://demoqa.com/books');
  }

  async selectRowsPerPage(count: string) {
    await this.page.getByLabel('rows per page').selectOption(count);
  }

  async goToNextPage() {
    await this.page.getByRole('button', { name: 'Next' }).click();
  }

  async goToPreviousPage() {
    await this.page.getByRole('button', { name: 'Previous' }).click();
  }

  async getBookTitles() {
    return await this.bookActionItem.allTextContents();
  }

  async searchBook(title: string) {
    await this.searchBox.fill(title);
  }
}
