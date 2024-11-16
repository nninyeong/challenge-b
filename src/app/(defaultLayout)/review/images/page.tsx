'use client';
import { useGetAllImageReivews } from '@/hooks/queries/review/useGetAllImageReviews';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import useMediaQuery from '@/hooks/review/useMediaQuery';
import ReviewDetailPage from '../[id]/page';
import { ReviewDetailModal } from '@/components/review/ReviewDetailModal';

const ImagePage = () => {
  const { data: imageReview, isLoading, error } = useGetAllImageReivews();
  const [selectedReviewId, setSelectedReviewId] = useState('');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1440px)');
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const handleReviewDetailPage = (id: string) => {
    setSelectedReviewId(id);
    if (isDesktop) {
      setIsReviewModalOpen(true);
    } else {
      router.push(`/review/${id}`);
    }
  };

  const closeModal = () => {
    setSelectedReviewId('');
    setIsReviewModalOpen(false);
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

      {isReviewModalOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-100'
          onClick={closeModal}
        >
          <div
            className='relative bg-white p-4 rounded-[24px] w-[603px] h-[812px]'
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src='assets/images/icons/x-03.webp'
              alt='닫기버튼'
              onClick={closeModal}
              className='absolute top-4 right-4 text-black w-[24px] h-[24px] cursor-pointer z-50'
            />

            <div className='relative z-10'>
              <ReviewDetailModal reviewId={selectedReviewId} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePage;
