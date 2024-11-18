'use client';

import { useReviewImage } from '@/hooks/queries/review/useGetReview';
import { Review } from '@/types/review.types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ReviewImageLoading } from '../loading/ReviewLoading';
import useMediaQuery from '@/hooks/review/useMediaQuery';
import ImagePage from '@/app/(defaultLayout)/review/images/page';

const ReviewImage = () => {
  const { data: allReviews, isLoading, error } = useReviewImage();
  const router = useRouter();
  const [displayedReviews, setDisplayedReviews] = useState<Review[]>([]);
  const isDesktop = useMediaQuery('(min-width: 1440px)');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    if (isImageModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isImageModalOpen]);

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
    return <ReviewImageLoading />;
  }

  if (error) {
    return <div>이미지 로드 중 에러가 발생했습니다.</div>;
  }

  const handleOpenNewPage = async () => {
    if (isDesktop) {
      setIsImageModalOpen(true);
    } else {
      await router.push('/review/images');
    }
  };

  const closeImageModal = () => setIsImageModalOpen(false);

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
      {isImageModalOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'
          onClick={closeImageModal}
        >
          <div
            className='relative bg-white p-4 rounded-[24px] w-[1136px] h-[533px] overflow-y-auto'
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src='assets/images/icons/x-03.webp'
              alt='닫기버튼'
              onClick={closeImageModal}
              className='absolute top-4 right-4 text-black w-[24px] h-[24px] '
            />
            <ImagePage />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewImage;
