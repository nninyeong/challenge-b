'use client';

import { useReviewImage } from '@/hooks/queries/review/useGetReview';
import { Review } from '@/types/review.types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ReviewImageLoading } from '../loading/ReviewLoading';

const ReviewImage = () => {
  const { data: allReviews, isLoading, error } = useReviewImage();

  const router = useRouter();
  const [displayedReviews, setDisplayedReviews] = useState<Review[]>([]);

  useEffect(() => {
    const updateDisplayedReviews = () => {
      const width = window.innerWidth;
      let reviewsToShow;

      if (width >= 1440) {
        reviewsToShow = 8;
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
    return <ReviewImageLoading />;
  }

  if (error) {
    throw new Error();
  }

  const handleOpenNewPage = () => {
    router.push('/review/images');
  };

  return (
    <div className='w-full grid grid-cols-4  desktop:grid-cols-8  desktop:gap-[24px] desktop:mt-[54px]  pb-4  desktop:pb-20 border border-solid border-gray-200 border-t-0 border-l-0 border-r-0 '>
      {displayedReviews?.map((review, reviewIndex) => {
        const firstImage = review.image_url?.[0];
        const isLastImage = reviewIndex === displayedReviews.length - 1;

        return (
          <div
            key={reviewIndex}
            className={`w-full  flex justify-center relative ${isLastImage ? 'opacity-50' : ''}  `}
          >
            <div className='desktop:w-[121px] desktop:h-[121px] relative w-[76px] h-[76px]'>
              {firstImage && (
                <Image
                  src={firstImage}
                  alt={`${reviewIndex + 1}`}
                  fill
                  className='rounded-xl object-cover absolute'
                  priority
                />
              )}
              {isLastImage && (
                <button
                  onClick={handleOpenNewPage}
                  className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-[12px] text-[14px]'
                >
                  더보기
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewImage;
