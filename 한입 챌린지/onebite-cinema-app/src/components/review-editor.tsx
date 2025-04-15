'use client';

import createReviewAction from '@/action/review-create-action';
import { useActionState, useEffect } from 'react';
import style from './review-editor.module.css';

export default function ReviewEditor({ movieId }: { movieId: string }) {
  const [state, formAction, isPending] = useActionState(createReviewAction, null);

  useEffect(() => {
    if (state && !state.status) alert(state.error);
  }, [state]);

  return (
    <div>
      <hr className={style.hr} />
      <section>
        <form className={style.form_container} action={formAction}>
          <input name='movieId' value={movieId} hidden readOnly />
          <textarea
            disabled={isPending}
            required
            name='content'
            placeholder='리뷰 내용을 작성해주세요.'
          />
          <div className={style.submit_container}>
            <input disabled={isPending} required name='author' placeholder='작성자' />
            <button disabled={isPending} type='submit'>
              {isPending ? '...' : '작성하기'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
