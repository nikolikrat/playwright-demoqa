import { z } from 'zod';

export const BookSchema = z.object({
  isbn: z.string(),
  title: z.string(),
  subTitle: z.string(),
  author: z.string(),
  publish_date: z.string(),
  publisher: z.string(),
  pages: z.number(),
  description: z.string(),
  website: z.string(),
});

export const BooksResponseSchema = z.object({
  books: z.array(BookSchema)
});