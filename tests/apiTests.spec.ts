import { test, expect, request } from "@playwright/test";
import { BookSchema, BooksResponseSchema } from "../schemas/bookSchema";

test("Scenario 4: Verify Book List API Response Status and Schema", async () => {
  const apiContext = await request.newContext();
  const response = await apiContext.get("https://demoqa.com/BookStore/v1/Books");
  const data = await response.json();

  await test.step("Response status is 200 OK", async () => {
    expect(response.status()).toBe(200);
  });

  await test.step("Response JSON includes a non-empty array of books", async () => {
    expect(data.books.length).toBeGreaterThan(0);
  });

  await test.step("Schema validation", async () => {
    BooksResponseSchema.parse(data);
    data.books.forEach((book: any) => {
      BookSchema.parse(book);
    });
  });
});
