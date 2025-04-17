export const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const API = {
  ALL: 'book',
  RANDOM: 'book/random',
  SEARCH: (word: string) => `book/search?q=${word}`,
  BOOKID: (id?: number) => `book/${id}`,
  REVIEW: 'review',
  REVIEWID: (id?: number) => `review/${id}`,
  REVIEWBOOK: (id?: number) => `review/book/${id}`,
};
