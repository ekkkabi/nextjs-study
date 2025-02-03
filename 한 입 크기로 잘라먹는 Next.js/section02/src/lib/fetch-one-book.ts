import { apiKey } from '@/constants/api';
import { BookData } from '@/types';

export default async function fetchOneBooks(id: number): Promise<BookData | null> {
  const url = `${apiKey}/book/${id}`;

  try {
    const respose = await fetch(url);
    if (!respose.ok) {
      throw new Error();
    }

    return await respose.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
