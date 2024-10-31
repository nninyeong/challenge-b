'use client';
import { getReview } from '@/utils/getReview';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import ReviewImage from '@/components/review/ReviewImage';
import { Review } from '@/types/review.types';
import ReviewCard from '@/components/review/ReviewCard';

const ReviewPage = () => {
  const row = 10;

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

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}. 다시 시도해 주세요.</div>;

  const reviews = reviewsData?.pages.flatMap((page) => page) || [];

  return (
    <div className='flex flex-col w-full p-4'>
      <h1>후기</h1>
      <ReviewImage />

      <div>
        <ReviewCard reviews={reviews} />
      </div>
      {isFetchingNextPage && <div>더 불러오는 중...</div>}
    </div>
  );
};

export default ReviewPage;
