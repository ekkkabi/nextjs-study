import fetchMovies from '@/lib/fetch-movies';
import fetchOneBooks from '@/lib/fetch-one-movie';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import style from './[id].module.css';

export const getStaticPaths = async () => {
  const movies = await fetchMovies();

  return {
    paths: movies.map((movie) => ({
      params: { id: String(movie.id) },
    })),
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const movie = await fetchOneBooks(Number(id));

  return {
    props: {
      movie,
    },
  };
};

export default function Page({ movie }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) return '로딩중입니다.';

  if (!movie) return '문제가 발생했습니다. 다시 시도하세요.';

  const { title, releaseDate, company, genres, subTitle, description, runtime, posterImgUrl } =
    movie;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <Image src={posterImgUrl} alt='posterImg' width={233.33} height={350} />
      </div>
      <h3 className={style.title}>{title}</h3>
      <div>
        {releaseDate} / {genres} / {runtime}분
      </div>
      <div>{company}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
