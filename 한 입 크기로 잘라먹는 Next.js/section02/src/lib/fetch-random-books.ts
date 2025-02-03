import { apiKey } from '@/constants/api';
import { BookData } from '@/types';

export default async function fetchRandomBooks(): Promise<BookData[]> {
  const url = `${apiKey}/book/random`;

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
