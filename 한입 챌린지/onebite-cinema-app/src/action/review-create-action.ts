'use server';

import { API, apiKey } from '@/constants/api';
import { revalidateTag } from 'next/cache';

export default async function createReviewAction(_: any, formData: FormData) {
  const movieId = formData.get('movieId')?.toString();
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();

  if (!movieId || !content || !author) {
    return {
      status: false,
      error: '리뷰내용과 작성자를 입력해주세요.',
    };
  }

  try {
    const req = await fetch(apiKey + API.REVIEW, {
      method: 'POST',
      body: JSON.stringify({ movieId, content, author }),
    });

    if (!req.ok) {
      throw new Error(req.statusText);
    }

    revalidateTag(`review-${movieId}`);

    return {
      status: true,
      error: '',
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      error: `리뷰 저장에 실패했습니다 : ${error}`,
    };
  }
}
