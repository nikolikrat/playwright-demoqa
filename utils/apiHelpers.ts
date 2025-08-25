import { expect, APIRequestContext } from '@playwright/test';
import 'dotenv/config';

export async function cleanupUserBooks(apiContext: APIRequestContext, userId: string) {
  const response = await apiContext.delete(`/BookStore/v1/Books?UserId=${userId}`);
  expect(response.ok()).toBeTruthy();
}

export async function loginUser(apiContext: APIRequestContext) {
  const response = await apiContext.post('/Account/v1/Login', {
    data: { userName: process.env.USER_NAME, password: process.env.USER_PASSWORD }
  });
  expect(response.ok()).toBeTruthy();
  return await response.json();
}

export async function addBookToUser(authContext: APIRequestContext, userId: string, isbn: string) {
  const response = await authContext.post('/BookStore/v1/Books', {
    data: { userId, collectionOfIsbns: [{ isbn }] }
  });
  expect(response.ok()).toBeTruthy();
}

export async function getUserBooks(authContext: APIRequestContext, userId: string) {
  const response = await authContext.get(`/BookStore/v1/Books?UserId=${userId}`);
  expect(response.ok()).toBeTruthy();
  return await response.json();
}