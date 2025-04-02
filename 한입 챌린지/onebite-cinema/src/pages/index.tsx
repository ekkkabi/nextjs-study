import MovieItem from '@/components/movie-item';
import SearchableLayout from '@/components/searchable-layout';
import fetchMovies from '@/lib/fetch-movies';
import fetchRandomBooks from '@/lib/fetch-random-movies';
import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { ReactNode } from 'react';
import style from './index.module.css';

export const getStaticProps = async () => {
  const [allMovies, recomMovies] = await Promise.all([fetchMovies(), fetchRandomBooks()]);

  return {
    props: {
      allMovies,
      recomMovies,
    },
    revalidate: 3,
  };
};

export default function Home({
  allMovies,
  recomMovies,
}: InferGetServerSidePropsType<typeof getStaticProps>) {

  return (
    <>
      <Head>
        <title>한입 씨네마</title>
      </Head>
      <meta property='og:image' content='/thumbnail.png' />
      <meta property='og:title' content='한입 씨네마마' />
      <meta property='og:description' content='한입 씨네마에서 다양한 영화들을 만나보세요' />
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
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
