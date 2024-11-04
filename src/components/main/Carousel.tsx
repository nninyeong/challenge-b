'use client';

import { useAuthUserQuery } from '@/hooks/queries/review/useGetReview';
import { useGetReviewCarouselQuery } from '@/hooks/queries/review/useGetReviewCarousel';
import { formatDate } from '@/utils/formatDate';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

const MAX_CONTENT_LENGTH = 60;

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: reviewsData = [], isLoading } = useGetReviewCarouselQuery();
  const { data: users } = useAuthUserQuery();

  const extendedReviewArr = useMemo(() => {
    return isLoading ? [] : [...reviewsData, ...reviewsData, ...reviewsData, reviewsData[0]];
  }, [isLoading, reviewsData]);

  useEffect(() => {
    if (extendedReviewArr.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % extendedReviewArr.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [extendedReviewArr.length]);

  useEffect(() => {
    if (extendedReviewArr.length > 0 && currentIndex === extendedReviewArr.length - 17) {
      const timeout = setTimeout(() => {
        setCurrentIndex(0);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, extendedReviewArr.length]);

  const getCarouselStyle = () => {
    return {
      transform: `translateX(${-currentIndex * (216 + 16)}px)`,
      transition: currentIndex === 0 ? 'none' : 'transform 0.5s ease-in-out',
    };
  };

  const sliceContent = (content: string) => {
    return content.slice(0, MAX_CONTENT_LENGTH) + (content.length > MAX_CONTENT_LENGTH ? '...' : '');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='overflow-hidden w-full'>
      <div
        className='flex justify-center'
        style={getCarouselStyle()}
      >
        {extendedReviewArr.map((review, index) => {
          const imgUrls = review.image_url || [];
          const user = users?.users.find((user) => user.id === review.user_id);
          const avatarUrl = user?.user_metadata?.avatar_url || '/images/defaultImg.png';
          return (
            <div
              key={`${review.id}-${index}`}
              className='mx-[8px]'
            >
              <div className='relative w-[216px] h-[192px] rounded-t-lg overflow-hidden'>
                {imgUrls.length > 0 && (
                  <Image
                    src={imgUrls[0]}
                    alt='리뷰 이미지'
                    layout='fill'
                    objectFit='cover'
                    priority
                  />
                )}
              </div>
              <div className='w-[216px] h-[136px] bg-gray-50 rounded-b-lg p-[16px] text-[12px]'>
                <div className='flex items-center gap-[6px] mb-[16px]'>
                  <div className='relative w-[16px] h-[16px] rounded-full overflow-hidden'>
                    <Image
                      src={avatarUrl}
                      alt='profile'
                      layout='fill'
                      objectFit='cover'
                      priority
                    />
                  </div>
                  <p className='text-gray-500'>
                    {review.user_name} | {formatDate(review.created_at)}
                  </p>
                </div>
                <p>{sliceContent(review.content)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
