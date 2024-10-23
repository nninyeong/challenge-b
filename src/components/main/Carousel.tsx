'use client';

import Image from 'next/image';

import { useEffect, useState } from 'react';

const Carousel = () => {
  const reviewArr = [
    {
      id: '1',
      user_id: '시작 시작',
      content: 'The hike was amazing, with beautiful scenery!',
      image_url: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=800&q=80',
    },

    {
      id: '2',
      user_id: 'user2',
      content: 'Challenging trail but totally worth it. Would go again!',
      image_url: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=800&q=80',
    },

    {
      id: '3',
      user_id: 'user3',
      content: 'Loved the peaceful atmosphere. Perfect for a weekend getaway.',
      image_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    },

    {
      id: '4',
      user_id: 'user4',
      content: 'Great hike, but be prepared for steep climbs.',
      image_url: 'https://images.unsplash.com/photo-1546525848-3ce03ca516f6?auto=format&fit=crop&w=800&q=80',
    },

    {
      id: '5',
      user_id: 'user5',
      content: 'Amazing views at the top, the sunset was breathtaking.',
      image_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    },

    {
      id: '6',
      user_id: 'user 6',
      content: 'Good for beginners, easy trails with lots of resting spots.',
      image_url: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=800&q=80',
    },

    {
      id: '7',
      user_id: 'user 7',
      content: 'Good for beginners, easy trails with lots of resting spots.',
      image_url: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=800&q=80',
    },

    {
      id: '8',
      user_id: '끝 끝',
      content: 'Good for beginners, easy trails with lots of resting spots.',
      image_url: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const extendedReviewArr = [reviewArr[reviewArr.length - 1], ...reviewArr, ...reviewArr, ...reviewArr];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % extendedReviewArr.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex === extendedReviewArr.length - 17) {
      setTimeout(() => {
        setCurrentIndex(0);
      }, 500);
    }
  }, [currentIndex, extendedReviewArr.length]);

  const getCarouselStyle = () => {
    return {
      transform: `translateX(${-currentIndex * (216 + 16)}px`,

      transition: `${currentIndex == 0 ? 'none' : 'transform 0.5s ease-in-out'}`,
    };
  };

  return (
    <div className='overflow-hidden w-full'>
      <div
        className='flex justify-center'
        style={getCarouselStyle()}
      >
        {extendedReviewArr.map((review, index) => {
          return (
            <div
              key={`${review.id} - ${index}`}
              className='mx-[8px]'
            >
              <div className='relative w-[216px] h-[222px] rounded-t-lg overflow-hidden'>
                <Image
                  src={review.image_url}
                  alt='리뷰 이미지'
                  layout='fill'
                  objectFit='cover'
                  priority
                />
              </div>

              <div className='w-[216px] h-[104px] border-2 rounded-b-lg'>
                <p>{review.user_id}</p>

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
