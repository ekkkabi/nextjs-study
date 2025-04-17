'use server';

import { API, apiKey } from '@/constants/api';
import { revalidateTag } from 'next/cache';

export async function deletReviewAction(_: any, formData: FormData) {
  const reviewId = formData.get('reviewId')?.toString();
  const bookId = formData.get('bookId')?.toString();

  if (!reviewId) {
    return {
      status: false,
      error: '삭제할 리뷰가 없습니다.',
    };
  }

  try {
    const res = await fetch(apiKey + API.REVIEWID(Number(reviewId)), {
      method: 'DELETE',
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
    return {
      status: false,
      error: `리뷰 삭제에 실패했습니다 : ${error}`,
    };
  }
}
