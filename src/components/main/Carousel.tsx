'use client';

import { Review } from '@/types/reviewData.types';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Carousel = () => {
  const browserClient = createClient();
  const [currentIndex, setCurrentIndex] = useState(0);

  const getReviews = async () => {
    const response = await browserClient
      .from('reviews')
      .select('*')
      .filter('image_url', 'neq', '[]')
      .order('created_at', { ascending: false })
      .limit(8);

    if (response.error) {
      console.log(response.error);
    }

    if (response.data === null) {
      return [];
    }

    return response.data;
  };

  const { data: reviewsData = [], isLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: getReviews,
  });

  const extendedReviewArr: Review[] = [
    reviewsData[reviewsData.length - 1],
    ...reviewsData,
    ...reviewsData,
    ...reviewsData,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % extendedReviewArr.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [extendedReviewArr.length]);

  useEffect(() => {
    if (currentIndex === extendedReviewArr.length - 17) {
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

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='overflow-hidden w-full'>
      <div
        className='flex justify-center'
        style={getCarouselStyle()}
      >
        {extendedReviewArr.map((review, index) => {
          const imgUrls = review.image_url as string[] | null;
          return (
            <div
              key={`${review.id}-${index}`}
              className='mx-[8px]'
            >
              <div className='relative w-[216px] h-[222px] rounded-t-lg overflow-hidden'>
                {imgUrls && imgUrls.length > 0 && (
                  <Image
                    src={imgUrls[0]}
                    alt='리뷰 이미지'
                    layout='fill'
                    objectFit='cover'
                    priority
                  />
                )}
              </div>
              <div className='w-[216px] h-[104px] border-2 rounded-b-lg'>
                <p>{review.user_name}</p>
                <p>{review.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
