import { API, apiKey } from '@/constants/api';
import { MovieData } from '@/types';
import { notFound } from 'next/navigation';
import style from './page.module.css';

export const dynamicParams = false;

export async function generateStaticParams() {
  const res = await fetch(apiKey + API.ALL, { cache: 'force-cache' });

  if (!res.ok) {
    console.error('오류가 발생했습니다');
    return [];
  }

  const ids: MovieData[] = await res.json();

  return ids.map((ele) => ({
    id: ele.id.toString(),
  }));
}

export default async function Page({ params }: { params: Promise<{ id: string | string[] }> }) {
  const movieId = (await params).id;
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
        <img src={posterImgUrl} />
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
