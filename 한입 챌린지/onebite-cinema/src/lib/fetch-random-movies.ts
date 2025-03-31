import { apiKey } from '@/constants/api';
import { MovieData } from '@/types';

export default async function fetchRandomBooks(): Promise<MovieData[]> {
  const url = `${apiKey}/movie/random`;

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
