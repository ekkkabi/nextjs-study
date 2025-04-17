import { MovieData } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import style from './movie-item.module.css';

export default function MovieItem({ id, title, posterImgUrl }: MovieData) {
  return (
    <Link href={`/movie/${id}`} className={style.container}>
      <Image src={posterImgUrl} width={280} height={100} alt={`${title}의 표지`} />
    </Link>
  );
}
