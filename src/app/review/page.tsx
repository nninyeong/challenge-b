'use client';

import { useCallback, useRef, useState, useEffect } from 'react';
import ReviewImage from '@/components/review/ReviewImage';
import ReviewCard from '@/components/review/ReviewCard';
import ReviewWriteButton from '@/components/review/ReviewWriteButton';
import ReviewWriteBottomSheet from '@/components/review/ReviewWriteBottomSheet';
import { createPortal } from 'react-dom';
import { useReviewInfinite } from '@/hooks/queries/review/useGetReview';
import { useReviewBottomSheetContext } from '@/provider/reviewBottomSheetProvider';
import { VIEW_HEIGHT } from '@/constants/viewHeight';

const ReviewPage = () => {
  const [portalElement, setPortalElement] = useState<Element | null>(null);
  const { isReviewBottomSheetOpen } = useReviewBottomSheetContext((state) => state);
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
    if (isReviewBottomSheetOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isReviewBottomSheetOpen]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}. 다시 시도해 주세요.</div>;

  const reviews = reviewsData?.pages.flatMap((page) => page) || [];

  return (
    <div className={`flex flex-col w-full p-4`}>
      <div className='w-full h-[47px]'>
        <h1 className='text-gray-900 text-[20px] font-semibold'>드림카드 이용 후기</h1>
        <h2 className='text-gray-700 text-[14px] font-medium'>To Speed up your Creative Workflow</h2>
      </div>

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
      <ReviewWriteButton />
      {isReviewBottomSheetOpen && (
        <div className={`fixed bg-black bg-opacity-60 w-full h-${VIEW_HEIGHT} z-40 top-0 left-0 inset-0`}></div>
      )}
      {isFetchingNextPage && <div>더 불러오는 중...</div>}
      {isReviewBottomSheetOpen && portalElement ? createPortal(<ReviewWriteBottomSheet />, portalElement) : null}
    </div>
  );
};

export default ReviewPage;
