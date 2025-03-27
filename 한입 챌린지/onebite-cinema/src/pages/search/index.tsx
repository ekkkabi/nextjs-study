import SearchableLayout from '@/components/searchable-layout';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

export default function Page() {
  const router = useRouter();
  const q = router.query.q;

  return (
    <>
      <h1 style={{ color: 'white' }}>검색 결과 : {q}</h1>
    </>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
