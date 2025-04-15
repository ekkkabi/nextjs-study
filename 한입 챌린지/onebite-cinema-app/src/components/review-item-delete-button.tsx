'use client';

import { deleteReviewAction } from '@/action/review-delete-action';
import { useActionState, useEffect, useRef } from 'react';
import style from './review-item.module.css';

export default function ReviewItemDeleteButton({
  reviewId,
  movieId,
}: {
  reviewId: number;
  movieId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(deleteReviewAction, null);

  useEffect(() => {
    if (state && !state.status) alert(state.error);
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input name='reviewId' value={reviewId} hidden readOnly />
      <input name='movieId' value={movieId} hidden readOnly />
      {isPending ? (
        <div>...</div>
      ) : (
        <div onClick={() => formRef.current?.requestSubmit()} className={style.delete_btn}>
          삭제
        </div>
      )}
    </form>
  );
}
