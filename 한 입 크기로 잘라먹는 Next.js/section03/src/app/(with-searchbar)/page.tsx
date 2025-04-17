import BookItem from '@/components/book-item';
import { API, apiKey } from '@/constants/api';
import { BookData } from '@/types';
import { Metadata } from 'next';
import style from './page.module.css';

async function AllBooks() {
  const res = await fetch(apiKey + API.ALL, { cache: 'force-cache' });
  if (!res.ok) return <div>오류가 발생했습니다...</div>;

  const allBooks: BookData[] = await res.json();

  return (
    <div>
      {allBooks.map((ele) => (
        <BookItem key={ele.id} {...ele} />
      ))}
    </div>
  );
}

async function RecoBooks() {
  const res = await fetch(apiKey + API.RANDOM, { next: { revalidate: 30 } });
  if (!res.ok) return <div>오류가 발생했습니다...</div>;

  const recoBooks: BookData[] = await res.json();

  return (
    <div>
      {recoBooks.map((ele) => (
        <BookItem key={ele.id} {...ele} />
      ))}
    </div>
  );
}

export const metadata: Metadata = {
  title: '한입 북스',
  description: '한입 북스에 등록된 도서를 만나보세요',
  openGraph: {
    title: '한입 북스',
    description: '한입 북스에 등록된 도서를 만나보세요',
    images: ['/thumbnail.png'],
  },
};

export default function Home() {
  console.log(apiKey);
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecoBooks />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
}
