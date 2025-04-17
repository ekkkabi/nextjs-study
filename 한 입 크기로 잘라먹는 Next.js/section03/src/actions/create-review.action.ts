'use server';

import { API, apiKey } from '@/constants/api';
import { revalidateTag } from 'next/cache';

export default async function createReviewAction(_: any, formData: FormData) {
  const bookId = formData.get('bookId')?.toString();
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();

  if (!bookId || !content || !author) {
    return {
      status: false,
      error: '리뷰 내용과 작성자를 입력해주세요.',
    };
  }

  try {
    const res = await fetch(apiKey + API.REVIEW, {
      method: 'POST',
      body: JSON.stringify({ bookId, content, author }),
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    revalidateTag(`review-${bookId}`);

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
