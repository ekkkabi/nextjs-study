import MovieItem from '@/components/movie-item';
import SearchableLayout from '@/components/searchable-layout';
import fetchMovies from '@/lib/fetch-movies';
import { MovieData } from '@/types';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import style from './index.module.css';

export default function Page() {
  const router = useRouter();
  const q = router.query.q;

  const [movies, setMovies] = useState<MovieData[]>([]);

  const fetchSearchResult = async () => {
    const data = await fetchMovies(q as string);
    setMovies(data);
  };

  useEffect(() => {
    if (q) fetchSearchResult();
  }, [q]);

  console.log(movies);

  return (
    <div className={style.search_result}>
      {movies.map((ele) => (
        <MovieItem key={ele.id} {...ele} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
