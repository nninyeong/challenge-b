'use client';

import { useCallback, useRef } from 'react';
import ReviewImage from '@/components/review/ReviewImage';
import ReviewCard from '@/components/review/ReviewCard';
import { useReviewInfinite } from '@/hooks/queries/review/useGetReview';

const ReviewPage = () => {
  const { data: reviewsData, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useReviewInfinite();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastReviewRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}. 다시 시도해 주세요.</div>;

  const reviews = reviewsData?.pages.flatMap((page) => page) || [];

  return (
    <div className='flex flex-col w-full p-4'>
      <h1>후기</h1>
      <ReviewImage />
      <div>
        <ReviewCard reviews={reviews} />
        {reviews.length > 0 && (
          <div
            ref={lastReviewRef}
            className='h-1'
          />
        )}
      </div>
      {isFetchingNextPage && <div>더 불러오는 중...</div>}
    </div>
  );
};

export default ReviewPage;
