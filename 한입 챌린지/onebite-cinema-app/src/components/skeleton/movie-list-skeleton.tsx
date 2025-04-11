import 'react-loading-skeleton/dist/skeleton.css';
import MovieItemSkeleton from './movie-item-skeleton';
import style from './movie-list-skeleton.module.css';

export default function MovieListSkeleton({
  count,
  all = false,
}: {
  count: number;
  all?: boolean;
}) {
  return (
    <div className={all ? style.all_container : style.container}>
      {new Array(count).fill(0).map((_, idx) => (
        <MovieItemSkeleton key={idx} />
      ))}
    </div>
  );
}
