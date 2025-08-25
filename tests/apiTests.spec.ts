import { test, expect, request } from "@playwright/test";
import { BookSchema, BooksResponseSchema } from "../schemas/bookSchema";
import { addBookToUser, cleanupUserBooks, getUserBooks, loginUser } from "../utils/apiHelpers";

const demoqaBaseUrl = 'https://demoqa.com';

test("Scenario 4: Verify Book List API Response Status and Schema", async () => {
  const apiContext = await request.newContext();
  const response = await apiContext.get(demoqaBaseUrl + '/BookStore/v1/Books');
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

test("Scenario 5: Add a Book to User's Collection via API and verify", async () => {
  const chosenIsbn = '9781449325862';
  const apiContext = await request.newContext({ baseURL: demoqaBaseUrl });
  const { userId, token } = await loginUser(apiContext);
  const authContext = await request.newContext({
    baseURL: demoqaBaseUrl,
    extraHTTPHeaders: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  await cleanupUserBooks(authContext, userId);
  await addBookToUser(authContext, userId, chosenIsbn);

  const collectionData = await getUserBooks(authContext, userId);
  expect(collectionData.books).toContainEqual(expect.objectContaining({ isbn: chosenIsbn }));
});