import MovieItem from '@/components/movie-item';
import { API, apiKey } from '@/constants/api';
import { MovieData } from '@/types';
import style from './page.module.css';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  const { q } = await searchParams;
  const res = await fetch(apiKey + API.SEARCH(q), {
    cache: 'force-cache',
  });
  if (!res.ok) return <div>오류가 발생했습니다...</div>;

  const searchMovies: MovieData[] = await res.json();
  return (
    <div className={style.search_result}>
      {searchMovies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}
