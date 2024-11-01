'use client';

import { useCallback, useRef, useState, useEffect } from 'react';
import ReviewImage from '@/components/review/ReviewImage';
import ReviewCard from '@/components/review/ReviewCard';
import ReviewWriteButton from '@/components/review/ReviewWriteButton';
import ReviewWriteBottomSheet from '@/components/review/ReviewWriteBottomSheet';
import { createPortal } from 'react-dom';
import { useReviewInfinite } from '@/hooks/queries/review/useGetReview';

const ReviewPage = () => {
  const [portalElement, setPortalElement] = useState<Element | null>(null);
  const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false);

  useEffect(() => {
    setPortalElement(document.getElementById('modal'));
  }, []);

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

  useEffect(() => {
    if (openBottomSheet) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [openBottomSheet]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}. 다시 시도해 주세요.</div>;

  const reviews = reviewsData?.pages.flatMap((page) => page) || [];

  return (
    <div className={`flex flex-col w-full p-4 ${openBottomSheet && 'bg-black bg-opacity-60'}`}>
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
      <ReviewWriteButton setOpenBottomSheet={setOpenBottomSheet} />
      {isFetchingNextPage && <div>더 불러오는 중...</div>}
      {openBottomSheet && portalElement
        ? createPortal(<ReviewWriteBottomSheet setOpenBottomSheet={setOpenBottomSheet} />, portalElement)
        : null}
    </div>
  );
};

export default ReviewPage;
