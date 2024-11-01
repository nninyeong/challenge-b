'use client';
import { getReview } from '@/utils/getReview';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import ReviewImage from '@/components/review/ReviewImage';
import { Review } from '@/types/review.types';
import ReviewCard from '@/components/review/ReviewCard';
import ReviewWriteButton from '@/components/review/ReviewWriteButton';
import ReviewWriteBottomSheet from '@/components/review/ReviewWriteBottomSheet';
import { createPortal } from 'react-dom';

const ReviewPage = () => {
  const row = 10;
  const [portalElement, setPortalElement] = useState<Element | null>(null);
  const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false);

  useEffect(() => {
    setPortalElement(document.getElementById('modal'));
  }, []);
  const {
    data: reviewsData,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<Review[]>({
    queryKey: ['reviews'],
    queryFn: async ({ pageParam }) => await getReview({ pageParam: pageParam as number, row }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === row ? allPages.length * row : undefined;
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 10 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
