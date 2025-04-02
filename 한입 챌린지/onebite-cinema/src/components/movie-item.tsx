import { MovieData } from '@/types';
import Link from 'next/link';

export default function MovieItem({ id, posterImgUrl }: MovieData) {
  console.log(posterImgUrl)
  return (
    <Link href={`/movie/${id}`}>
      <img src={posterImgUrl} />
    </Link>
  );
}
