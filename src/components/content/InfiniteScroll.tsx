'use client';

import { useEffect, ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

interface InfiniteScrollProps {
  children: ReactNode;
  loadMore: () => void;
  hasMore: boolean;
  loader: ReactNode;
  threshold?: number;
  rootMargin?: string;
}

export default function InfiniteScroll({
  children,
  loadMore,
  hasMore,
  loader,
  threshold = 0.1,
  rootMargin = '100px',
}: InfiniteScrollProps) {
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
  });

  useEffect(() => {
    if (inView && hasMore) {
      loadMore();
    }
  }, [inView, hasMore, loadMore]);

  return (
    <>
      {children}
      {hasMore && (
        <div ref={ref} className="w-full py-4">
          {loader}
        </div>
      )}
    </>
  );
}