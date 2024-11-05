'use client';

import { useReviewImage } from '@/hooks/queries/review/useGetReview';
import { Review } from '@/types/review.types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ReviewImage = () => {
  const { data: allReviews, isLoading, error } = useReviewImage();

  const router = useRouter();
  const [displayedReviews, setDisplayedReviews] = useState<Review[]>([]);

  useEffect(() => {
    const updateDisplayedReviews = () => {
      const width = window.innerWidth;
      let reviewsToShow;

      if (width >= 1024) {
        reviewsToShow = 6;
      } else if (width >= 768) {
        reviewsToShow = 5;
      } else {
        reviewsToShow = 4;
      }

      setDisplayedReviews(allReviews?.slice(0, reviewsToShow) || []);
    };

    updateDisplayedReviews();

    window.addEventListener('resize', updateDisplayedReviews);

    return () => {
      window.removeEventListener('resize', updateDisplayedReviews);
    };
  }, [allReviews]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>이미지 로드 중 에러가 발생했습니다.</div>;
  }

  const handleOpenNewPage = async () => {
    await router.push('/review/images');
  };

  return (
    <div className='w-full grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-[13px] mt-[20px] mb-[24px]'>
      {displayedReviews?.map((review, reviewIndex) => {
        const firstImage = review.image_url?.[0];
        const isLastImage = reviewIndex === displayedReviews.length - 1;

        return (
          <div
            key={reviewIndex}
            className={`w-full h-0 pb-[100%] relative ${isLastImage ? 'opacity-50' : ''}`}
          >
            {firstImage && (
              <Image
                src={firstImage}
                alt={`${reviewIndex + 1}`}
                fill
                objectFit='cover'
                sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
                className='rounded-[12px]'
                priority
              />
            )}
            {isLastImage && (
              <button
                onClick={handleOpenNewPage}
                className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-[12px]'
              >
                더보기
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ReviewImage;
