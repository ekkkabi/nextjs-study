'use server';

import { API, apiKey } from '@/constants/api';

export default async function createReviewAction(formData: FormData) {
  const movieId = formData.get('movieId')?.toString();
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();

  if (!movieId || !content || !author) return;

  try {
    const req = await fetch(apiKey + API.REVIEW, {
      method: 'POST',
      body: JSON.stringify({ movieId, content, author }),
    });
    console.log(req.status);
  } catch (error) {
    console.error(error);
    return;
  }
}
