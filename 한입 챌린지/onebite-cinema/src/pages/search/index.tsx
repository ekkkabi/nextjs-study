import MovieItem from '@/components/movie-time';
import SearchableLayout from '@/components/searchable-layout';
import fetchMovies from '@/lib/fetch-movies';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import style from './index.module.css';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const q = context.query.q;
  const movies = await fetchMovies(q as string);

  return {
    props: {
      movies,
    },
  };
};

export default function Page({ movies }: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
