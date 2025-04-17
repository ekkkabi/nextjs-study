import BookItem from '@/components/book-item';
import BookListSkeleton from '@/components/skeleton/book-list-skeleton';
import { API, apiKey } from '@/constants/api';
import { BookData } from '@/types';
import { Suspense } from 'react';

async function SearchResult({ q }: { q: string }) {
  const res = await fetch(apiKey + API.SEARCH(q), {
    cache: 'force-cache',
  });
  if (!res.ok) return <div>오류가 발생했습니다...</div>;
  const searchBooks: BookData[] = await res.json();

  return (
    <div>
      {searchBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  return (
    <Suspense key={q || ''} fallback={<BookListSkeleton count={3} />}>
      <SearchResult q={q || ''} />
    </Suspense>
  );
}
