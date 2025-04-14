import createReviewAction from '@/action/review-create-action';
import style from './review-editor.module.css';

export default function ReviewEditor({ movieId }: { movieId: string }) {
  return (
    <div>
      <hr className={style.hr} />
      <section>
        <form className={style.form_container} action={createReviewAction}>
          <input name='movieId' value={movieId} hidden readOnly />
          <textarea required name='content' placeholder='리뷰 내용을 작성해주세요.' />
          <div className={style.submit_container}>
            <input required name='author' placeholder='작성자' />
            <button type='submit'>작성하기</button>
          </div>
        </form>
      </section>
    </div>
  );
}
