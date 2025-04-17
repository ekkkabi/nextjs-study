import ReviewEditor from '@/components/review-editor';
import ReviewItem from '@/components/review-item';
import { API, apiKey } from '@/constants/api';
import { BookData, ReviewData } from '@/types';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import style from './page.module.css';

export const dynamicParams = false;

export async function generateStaticParams() {
  const response = await fetch(apiKey + API.ALL, { cache: 'force-cache' });
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const books: BookData[] = await response.json();

  return books.map((book) => ({
    id: book.id.toString(),
  }));
}

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(apiKey + API.BOOKID(Number(bookId)), { cache: 'force-cache' });

  if (!response.ok) {
    if (response.status === 404) {
      return notFound();
    }
    return <div>오류가 발생했습니다...</div>;
  }

  const book = await response.json();

  const { id, title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <Image src={coverImgUrl} width={240} height={300} alt={`도서 ${title}의 표지 이미지`} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

async function ReviewList({ bookId }: { bookId: string }) {
  const response = await fetch(apiKey + API.REVIEWBOOK(Number(bookId)), {
    next: { tags: [`review-${bookId}`] },
  });

  if (!response.ok) {
    throw new Error(`Review fetch failed : ${response.statusText}`);
  }

  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
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
  const response = await fetch(apiKey + API.BOOKID(Number(id)), {
    cache: 'force-cache',
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const book: BookData = await response.json();

  return {
    title: `${book.title} - 한입북스`,
    description: `${book.description}`,
    openGraph: {
      title: `${book.title} - 한입북스`,
      description: `${book.description}`,
      images: [book.coverImgUrl],
    },
  };
}

export default async function Page({ params }: { params: PagePrams }) {
  const { id } = await params;

  return (
    <div className={style.container}>
      <BookDetail bookId={id} />
      <ReviewEditor bookId={id} />
      <ReviewList bookId={id} />
    </div>
  );
}
