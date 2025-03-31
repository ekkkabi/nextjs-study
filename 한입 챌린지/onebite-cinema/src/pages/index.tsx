import MovieItem from '@/components/movie-time';
import SearchableLayout from '@/components/searchable-layout';
import fetchMovies from '@/lib/fetch-movies';
import fetchRandomBooks from '@/lib/fetch-random-movies';
import { InferGetServerSidePropsType } from 'next';
import { ReactNode } from 'react';
import style from './index.module.css';

export const getServerSideProps = async () => {
  const [allMovies, recomMovies] = await Promise.all([fetchMovies(), fetchRandomBooks()]);

  return {
    props: {
      allMovies,
      recomMovies,
    },
  };
};

export default function Home({
  allMovies,
  recomMovies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.section_recommand}>
          {recomMovies.map((ele) => (
            <MovieItem key={ele.id} {...ele} />
          ))}
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={style.section_all_movie}>
          {allMovies.map((ele) => (
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
