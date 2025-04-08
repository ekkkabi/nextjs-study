export const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const API = {
  ALL: 'movie',
  RANDOM: 'movie/random',
  SEARCH: (word?: string) => `movie/search?q=${word}`,
  MOVIEID: (id?: number) => `movie/${id}`,
};
