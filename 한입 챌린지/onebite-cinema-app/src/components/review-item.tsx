import { ReviewData } from '@/types';
import ReviewItemDeleteButton from './review-item-delete-button';
import style from './review-item.module.css';

export async function RevieItem({ id, content, author, createdAt, movieId }: ReviewData) {
  return (
    <div className={style.container}>
      <div className={style.author}>{author}</div>
      <div className={style.content}>{content}</div>
      <div className={style.bottom_container}>
        <div className={style.date}>{new Date(createdAt).toLocaleDateString()}</div>
        <ReviewItemDeleteButton reviewId={id} movieId={movieId} />
      </div>
    </div>
  );
}
