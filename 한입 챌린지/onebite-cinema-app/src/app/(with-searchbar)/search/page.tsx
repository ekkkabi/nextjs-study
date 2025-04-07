'use client';

import MovieItem from '@/components/movie-item';
import movies from '@/mock/movie.json';
import { useSearchParams } from 'next/navigation';
import style from './page.module.css';

export default function Page() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q');

  const filterM = q ? movies.filter((movie) => movie.title.includes(q)) : movies;

  return (
    <div className={style.search_result}>
      {filterM.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}
