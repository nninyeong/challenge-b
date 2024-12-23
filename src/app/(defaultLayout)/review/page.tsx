'use client';

import { useCallback, useRef, useState, useEffect } from 'react';
import ReviewImage from '@/components/review/ReviewImage';
import ReviewCard from '@/components/review/ReviewCard';
import ReviewWriteButton from '@/components/review/ReviewWriteButton';
import ReviewWriteBottomSheet from '@/components/review/ReviewWriteBottomSheet';
import { createPortal } from 'react-dom';
import { useReviewInfinite } from '@/hooks/queries/review/useGetReview';
import { useReviewBottomSheetContext } from '@/provider/reviewBottomSheetProvider';
import { MOBILE_VIEW_HEIGHT } from '@/constants/screenSize';

const ReviewPage = () => {
  const [portalElement, setPortalElement] = useState<Element | null>(null);
  const { isReviewBottomSheetOpen } = useReviewBottomSheetContext((state) => state);
  useEffect(() => {
    setPortalElement(document.getElementById('modal'));
  }, []);

  const { data: reviewsData, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useReviewInfinite();
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

  if (error) return <div>에러가 발생했습니다: {error.message}. 다시 시도해 주세요.</div>;

  const reviews = reviewsData?.pages.flatMap((page) => page) || [];

  return (
    <div className='flex flex-col w-full mx-auto desktop:w-[1136px] px-4 desktop:px-0 pt-4 desktop:pb-11 desktop:mt-[160px] mt-4'>
      <div className='w-full h-[47px] gap-[6px] desktop:gap-3 desktop:mb-[54px] mb-6'>
        <h2 className='text-gray-900 text-[20px] font-bold desktop:text-[36px] '>드림카드 이용 후기</h2>
        <h3 className='text-gray-700 text-[14px] font-medium desktop:text-[24px]'>
          드림카드와 함께한 소중한 순간의 기록
        </h3>
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
        <div className={`fixed bg-black bg-opacity-60 w-full h-${MOBILE_VIEW_HEIGHT} z-40 top-0 left-0 inset-0`}></div>
      )}
      {isFetchingNextPage && <div>더 불러오는 중...</div>}
      {isReviewBottomSheetOpen && portalElement ? createPortal(<ReviewWriteBottomSheet />, portalElement) : null}
    </div>
  );
};

export default ReviewPage;
