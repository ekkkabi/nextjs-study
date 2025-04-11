import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function MovieItemSkeleton() {
  return (
    <div style={{ aspectRatio: '2/3', width: '100%' }}>
      <Skeleton height='100%' width='100%' />
    </div>
  );
}
