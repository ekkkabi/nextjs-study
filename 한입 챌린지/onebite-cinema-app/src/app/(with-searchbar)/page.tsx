import MovieItem from '@/components/movie-item';
import MovieListSkeleton from '@/components/skeleton/movie-list-skeleton';
import { API, apiKey } from '@/constants/api';
import { MovieData } from '@/types';
import { Suspense } from 'react';
import style from './page.module.css';

async function AllMovies() {
  const res = await fetch(apiKey + API.ALL, {
    cache: 'force-cache',
  });
  if (!res.ok) return <div>오류가 발생했습니다...</div>;
  const allMovies: MovieData[] = await res.json();
  return allMovies.map((ele) => <MovieItem key={ele.id} {...ele} />);
}

async function RecoMovies() {
  const res = await fetch(apiKey + API.RANDOM, {
    next: {
      revalidate: 300,
    },
  });
  if (!res.ok) return <div>오류가 발생했습니다...</div>;
  const recoMovies: MovieData[] = await res.json();
  return recoMovies.map((ele) => <MovieItem key={ele.id} {...ele} />);
}

export const dynamic = 'force-dynamic';

export default async function Home() {
  return (
    <div className={style.conatiner}>
      <section>
        <h2>지금 가장 추천하는 영화</h2>
        <Suspense fallback={<MovieListSkeleton count={3} />}>
          <div className={style.section_recommand}>
            <RecoMovies />
          </div>
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <Suspense fallback={<MovieListSkeleton count={10} all={true} />}>
          <div className={style.section_all_movie}>
            <AllMovies />
          </div>
        </Suspense>
      </section>
    </div>
  );
}
