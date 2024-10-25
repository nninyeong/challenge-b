'use client';
import { getAllImageReviews } from '@/utils/getReview';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const ImagePage = () => {
  const {
    data: imageReview,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['imageReview'],
    queryFn: getAllImageReviews,
  });

  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2 pt-2 pb-2'>
      {imageReview?.map((review, reviewIndex) => {
        const firstImage = review.image_url?.[0];
        const handleReviewDetailPage = () => {
          router.push(`/review/${review.id}`);
        };

        return (
          firstImage && (
            <div
              key={reviewIndex}
              onClick={handleReviewDetailPage}
              className='cursor-pointer w-full h-0 pb-[100%] relative'
            >
              <Image
                src={firstImage}
                alt={`Review ${reviewIndex + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
                className='rounded'
                priority
              />
            </div>
          )
        );
      })}
    </div>
  );
};

export default ImagePage;
