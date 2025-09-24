import { useState, useEffect, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number;
  rootMargin?: string;
  hasMore: boolean;
  loading: boolean;
}

export default function useInfiniteScroll(
  callback: () => void,
  options: UseInfiniteScrollOptions
): [(node: HTMLElement | null) => void] {
  const { threshold = 0.1, rootMargin = '100px', hasMore, loading } = options;
  const [target, setTarget] = useState<HTMLElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      // Check if entry exists before accessing its properties
      if (entry?.isIntersecting && hasMore && !loading) {
        callback();
      }
    },
    [callback, hasMore, loading]
  );

  useEffect(() => {
    if (!target) return;

    const option = {
      root: null,
      rootMargin,
      threshold,
    };

    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(target);

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [target, handleObserver, rootMargin, threshold]);

  const setTargetRef = useCallback((node: HTMLElement | null) => {
    setTarget(node);
  }, []);

  return [setTargetRef];
}