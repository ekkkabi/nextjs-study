import { apiKey } from '@/constants/api';
import { MovieData } from '@/types';

export default async function fetchOneBooks(id: number): Promise<MovieData | null> {
  const url = `${apiKey}/movie/${id}`;

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
