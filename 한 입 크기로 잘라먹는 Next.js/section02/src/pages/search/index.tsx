import BookItem from '@/components/book-item';
import SearchableLayout from '@/components/searchable-layout';
import fetchBooks from '@/lib/fetch-books';
import { BookData } from '@/types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   const { q } = context.query;
//   const books = await fetchBooks(q as string);

//   return {
//     props: { books },
//   };
// };

export default function Page() {
  const [books, setBooks] = useState<BookData[]>([]);

  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

  return (
    <div>
      <Head>
        <title>한입북스 - 검색결과</title>
      </Head>
      <meta property='og:image' content='/thumbnail.png' />
      <meta property='og:title' content='한입북스' />
      <meta property='og:description' content='한입 북스 - 검색결과' />

      {books.map((item) => (
        <BookItem key={item.id} {...item} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
