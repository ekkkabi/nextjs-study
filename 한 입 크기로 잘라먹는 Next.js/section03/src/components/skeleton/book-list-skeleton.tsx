import BookItemSkeleton from './book-item-skeletion';

export default function BookListSkeleton({ count }: { count: number }) {
  return new Array(count)
    .fill(0)
    .map((_, idx) => <BookItemSkeleton key={`book-item-skleton-${idx}`} />);
}
