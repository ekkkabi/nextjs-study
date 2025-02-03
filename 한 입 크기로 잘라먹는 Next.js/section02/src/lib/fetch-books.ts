import { apiKey } from '@/constants/api';
import { BookData } from '@/types';

export default async function fetchBooks(q?: string): Promise<BookData[]> {
  let url = `${apiKey}/book`;

  if (q) {
    url += `/search?q=${q}`;
  }

  try {
    const respose = await fetch(url);
    if (!respose.ok) {
      throw new Error();
    }

    return await respose.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
