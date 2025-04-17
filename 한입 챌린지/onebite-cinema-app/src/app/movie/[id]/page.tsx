import ReviewEditor from '@/components/review-editor';
import { RevieItem } from '@/components/review-item';
import { API, apiKey } from '@/constants/api';
import { MovieData, ReviewData } from '@/types';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import style from './page.module.css';

export const dynamicParams = false;

export async function generateStaticParams() {
  const res = await fetch(apiKey + API.ALL, { cache: 'force-cache' });

  if (!res.ok) throw new Error(res.statusText);

  const ids: MovieData[] = await res.json();

  return ids.map((ele) => ({
    id: ele.id.toString(),
  }));
}

async function MovieDetail({ movieId }: { movieId: string }) {
  const res = await fetch(apiKey + API.MOVIEID(Number(movieId)), {
    cache: 'force-cache',
  });

  if (!res.ok) {
    if (res.status === 404) return notFound();
    return <div>오류가 발생했습니다...</div>;
  }
  const { id, title, subTitle, company, runtime, description, posterImgUrl, releaseDate, genres } =
    await res.json();

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <Image src={posterImgUrl} width={240} height={320} alt={`${title}의 표지`} />
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

async function ReviewList({ movieId }: { movieId: string }) {
  const res = await fetch(apiKey + API.REVIEWMOVIEID(Number(movieId)), {
    next: { tags: [`review-${movieId}`] },
  });

  if (!res.ok) throw new Error(`Review fetch failed ${res.statusText}`);

  const reviews: ReviewData[] = await res.json();

  return (
    <section>
      {reviews.map((ele) => (
        <RevieItem key={`review-item-${ele.id}`} {...ele} />
      ))}
    </section>
  );
}

type PagePrams = Promise<{ id: string }>;

export async function generateMetadata({
  params,
}: {
  params: PagePrams;
}): Promise<Metadata | null> {
  const { id } = await params;
  const res = await fetch(apiKey + API.MOVIEID(Number(id)));

  if (!res.ok) throw new Error(res.statusText);

  const movie: MovieData = await res.json();

  return {
    title: `${movie.title}`,
    description: `${movie.description}`,
    openGraph: {
      title: `${movie.title} - 한입 씨네마`,
      description: `${movie.description}`,
      images: [
        {
          url: movie.posterImgUrl,
          alt: `${movie.title}의 표지 이미지`,
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: PagePrams }) {
  const { id } = await params;

  return (
    <div className={style.container}>
      <MovieDetail movieId={id} />
      <ReviewEditor movieId={id} />
      <ReviewList movieId={id} />
    </div>
  );
}
