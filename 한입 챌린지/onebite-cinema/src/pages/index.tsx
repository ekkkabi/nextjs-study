import MovieItem from '@/components/movie-time';
import SearchableLayout from '@/components/searchable-layout';
import movies from '@/mock/movie.json';
import { ReactNode } from 'react';
import style from './index.module.css';

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.section_recommand}>
          {movies.slice(0, 3).map((ele) => (
            <MovieItem key={ele.id} {...ele} />
          ))}
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={style.section_all_movie}>
          {movies.map((ele) => (
            <MovieItem key={ele.id} {...ele} />
          ))}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
