'use client';

import createReviewAction from '@/actions/create-review.action';
import { useActionState, useEffect } from 'react';
import style from './review-editor.module.css';

export default function ReviewEditor({ bookId }: { bookId: string }) {
  const [state, formAction, isPending] = useActionState(createReviewAction, null);

  useEffect(() => {
    if (state && !state.status) alert(state.error);
  }, [state]);

  return (
    <section>
      <form className={style.form_container} action={formAction}>
        <input name='bookId' value={bookId} hidden readOnly />
        <textarea disabled={isPending} required name='content' placeholder='리뷰 내용' />
        <div className={style.submit_container}>
          <input disabled={isPending} required name='author' placeholder='작성자' />
          <button disabled={isPending} type='submit'>
            작성하기
          </button>
          {isPending && '...'}
        </div>
      </form>
    </section>
  );
}
