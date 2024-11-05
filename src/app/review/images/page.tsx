'use client';
import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { useGetAllImageReivews } from '@/hooks/queries/review/useGetAllImageReviews';
import { getAllImageReviews } from '@/utils/getReview';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const ImagePage = () => {
  const { data: imageReview, isLoading, error } = useGetAllImageReivews();

  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  const handleReviewDetailPage = (id: string) => {
    router.push(`/review/${id}`);
  };

  return (
    <div className='p-[16px]'>
      <h1 className='font-bold text-[20px]'>포토 후기 모아보기</h1>
      <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-[8px] pt-2 pb-2 mt-[40px]'>
        {imageReview?.map((review, reviewIndex) => {
          const firstImage = review.image_url?.[0];

          return (
            firstImage && (
              <div
                key={reviewIndex}
                onClick={() => handleReviewDetailPage(review.id)}
                className='cursor-pointer w-full h-0 pb-[100%] relative'
              >
                <Image
                  src={firstImage}
                  alt={`Review ${reviewIndex + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
                  className='rounded-[12px]'
                  priority
                />
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default ImagePage;
