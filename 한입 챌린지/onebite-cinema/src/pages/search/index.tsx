import MovieItem from '@/components/movie-time';
import SearchableLayout from '@/components/searchable-layout';
import movies from '@/mock/movie.json';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import style from './index.module.css';

export default function Page() {
  const router = useRouter();
  const q = router.query.q as string;

  return (
    <div className={style.search_result}>
      {movies
        .filter((movie) => movie.title.includes(q))
        .map((ele) => (
          <MovieItem key={ele.id} {...ele} />
        ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
