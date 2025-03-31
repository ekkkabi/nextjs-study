import { apiKey } from '@/constants/api';
import { MovieData } from '@/types';

export default async function fetchMovies(q?: string): Promise<MovieData[]> {
  let url = `${apiKey}/movie`;

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
