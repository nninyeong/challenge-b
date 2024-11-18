'use client';
import { formatDate } from '@/utils/formatDate';
import { maskIdLastFour } from '@/utils/maskIdLastFour';
import { getContentPreview, MAX_CONTENT_LENGTH } from '@/utils/getContentPreview';
import Image from 'next/image';
import { Review } from '@/types/review.types';
import { Notify } from 'notiflix';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import useMediaQuery from '@/hooks/review/useMediaQuery';
import { ReviewDetailModal } from './ReviewDetailModal';
import SmileyHappy from '../icons/SmileyHappy';
import { User as SupabaseUser } from '@supabase/auth-js';
const ReviewItem = ({
  review,
  user,
  isExpanded,
  onToggle,
  onNavigate,
  onLikeToggle,
  onDeleteReview,
  isLiked,
  likeCount,
}: {
  review: Review;
  user: SupabaseUser;
  isExpanded: boolean;
  onToggle: () => void;
  onNavigate: () => void;
  onLikeToggle: () => void;
  onDeleteReview: () => void;
  isLiked: boolean;
  likeCount: number | string;
}) => {
  const [selectedReviewId, setSelectedReviewId] = useState('');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1440px)');
  const pathname = usePathname();

  useEffect(() => {
    if (isReviewModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isReviewModalOpen]);

  const handleNotYetButton = () => {
    Notify.info('준비중인 서비스입니다.');
  };

  const handleReviewDetailPage = (id: string) => {
    setSelectedReviewId(id);
    if (isDesktop) {
      setIsReviewModalOpen(true);
    } else {
      onNavigate();
    }
  };

  const closeModal = () => {
    setSelectedReviewId('');
    setIsReviewModalOpen(false);
  };

  return (
    <div className='flex flex-col justify-between min-h-[159px] items-center border-b border-gray-200 border-solid mt-4 pb-[15px]'>
      <div className='w-full flex cursor-pointer relative'>
        <div className='w-[88px] h-[88px] desktop:w-[112px] desktop:h-[112px] flex-shrink-0 relative'>
          {review.image_url && review.image_url.length > 0 ? (
            <Image
              src={review.image_url[0]}
              alt='후기 이미지'
              fill
              priority
              className='rounded-[12px]  object-cover'
              onClick={review.image_url ? () => handleReviewDetailPage(review.id) : undefined}
              sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
            />
          ) : (
            <img
              src='/assets/images/card/no-review.png'
              alt='no review'
            />
          )}
          {review.image_url.length > 1 && (
            <div className='absolute right-1 bottom-1 rounded'>
              <img
                src='/assets/images/icons/layers-1.png'
                alt='more images icon'
                loading='lazy'
                className='w-[24px] h-[24px]'
              />
            </div>
          )}
        </div>

        <div
          className={`w-full flex flex-col whitespace-pre-wrap break-words ${isExpanded ? 'h-auto' : 'h-[80%] overflow-hidden'}`}
        >
          <div className='flex'>
            <div className='flex ml-[16px] items-center  desktop:mb-6'>
              {user?.user_metadata.avatar_url && user?.user_metadata.avatar_url.length > 0 ? (
                <div className='w-[16px] h-[16px] relative desktop:w-[24px] desktop:h-[24px]'>
                  <Image
                    src={user.user_metadata.avatar_url || '/assets/images/defaultImg.png'}
                    alt='profile'
                    fill
                    className='rounded-full  object-cover'
                  />
                </div>
              ) : (
                <div className='w-[16px] h-[16px] relative desktop:w-[24px] desktop:h-[24px]'>
                  <Image
                    src='/assets/images/defaultImg.png'
                    alt='profile'
                    fill
                    className='rounded-full object-cover'
                  />
                </div>
              )}
              <h3 className='ml-[8px] text-gray-500 text-[12px] desktop:text-[14px]'>
                {maskIdLastFour(user?.user_metadata.email)}
              </h3>
              <p className='text-gray-500 text-[12px] desktop:text-[14px]'> | {formatDate(review.created_at)}</p>
            </div>
          </div>
          <div className='flex pl-4 pb-4 pr-4 pt-[6px]'>
            <p className='break-words  leading-[140%] text-[12px] text-gray-800  basis-48 desktop:text-16px'>
              {getContentPreview(review.content, isExpanded)}
            </p>
            {review.content.length > MAX_CONTENT_LENGTH && (
              <button
                onClick={onToggle}
                className='text-[10px] border-b border-gray-500 text-gray-500 absolute right-2 bottom-4 basis-2/10'
              >
                {isExpanded ? '접기' : '더보기'}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className='self-end flex gap-[8px]'>
        {pathname === '/mypage' ? (
          <button
            className='text-[12px] flex items-center justify-center border-primary-300 border-[1px] border-solid rounded-[90px] w-[76px] h-[24px] text-primary-300'
            onClick={onDeleteReview}
          >
            <img
              src='/assets/images/icons/trash-01.svg'
              alt='삭제하기'
            />
            <span>삭제하기</span>
          </button>
        ) : (
          <>
            <button
              className='text-[12px] gap-0.5 flex items-center justify-center border-primary-300 border-[1px] border-solid rounded-[90px] w-[76px] h-[24px] text-primary-300'
              onClick={handleNotYetButton}
            >
              <img
                src='/assets/images/icons/link-angled.svg'
                alt='공유하기'
              />
              <span>공유하기</span>
            </button>
            <button
              onClick={onLikeToggle}
              className={`text-[12px] gap-0.5 flex items-center justify-center border-primary-300 border-[1px] border-solid rounded-[90px] w-[100px] h-[24px] text-primary-300 ${isLiked && 'bg-primary-300 '} `}
            >
              <SmileyHappy isLiked={isLiked} />
              <span className={`${isLiked ? 'text-white' : ''}`}>도움돼요({likeCount})</span>
            </button>
          </>
        )}
        {isReviewModalOpen && (
          <div
            className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[9999]'
            onClick={closeModal}
          >
            <div
              className='relative bg-white p-4 rounded-[24px] w-[603px] h-[812px] z-[10000]'
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src='assets/images/icons/x-03.webp'
                alt='닫기버튼'
                onClick={closeModal}
                className='absolute top-4 right-4 text-black w-[24px] h-[24px] cursor-pointer z-[10100]'
              />

              <div className='relative'>
                <ReviewDetailModal reviewId={selectedReviewId} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewItem;
