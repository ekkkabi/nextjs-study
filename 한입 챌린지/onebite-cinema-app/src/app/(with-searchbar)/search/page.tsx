import MovieItem from '@/components/movie-item';
import MovieListSkeleton from '@/components/skeleton/movie-list-skeleton';
import { API, apiKey } from '@/constants/api';
import { MovieData } from '@/types';
import { Suspense } from 'react';
import style from './page.module.css';

async function SearchResult({ q }: { q: string }) {
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

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  return (
    <Suspense key={q || ''} fallback={<MovieListSkeleton count={6} />}>
      <SearchResult q={q || ''} />
    </Suspense>
  );
}
