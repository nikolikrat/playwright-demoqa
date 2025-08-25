import { test, expect, request } from "@playwright/test";
import { BookSchema, BooksResponseSchema } from "../schemas/bookSchema";
import 'dotenv/config';

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

test("Scenario 5: Add a Book to User's Collection via API and verify", async () => {
  const chosenIsbn = '9781449325862'
  const apiContext = await request.newContext({ baseURL: 'https://demoqa.com' });
  const loginResponse = await apiContext.post('/Account/v1/Login', {
    data: { userName: process.env.USER_NAME, password: process.env.USER_PASSWORD }
  });
  const loginData = await loginResponse.json();
  const { userId, token } = loginData;
  const authContext = await request.newContext({
    baseURL: 'https://demoqa.com',
    extraHTTPHeaders: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  const addBookResp = await authContext.post('/BookStore/v1/Books', {
    data: {
      userId: userId,
      collectionOfIsbns: [{ isbn: chosenIsbn }]
    }
  });
  expect(addBookResp.ok()).toBeTruthy();
  const getCollectionResp = await authContext.get(`/BookStore/v1/Books?UserId=${userId}`);
  expect(getCollectionResp.ok()).toBeTruthy();
  const collectionData = await getCollectionResp.json();
  const isbnsInCollection = collectionData.books.map((b: any) => b.isbn);
  expect(isbnsInCollection).toContain(chosenIsbn);
});