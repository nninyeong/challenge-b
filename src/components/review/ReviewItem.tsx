'use client';
import { formatDate } from '@/utils/formatDate';
import { maskIdLastFour } from '@/utils/maskIdLastFour';
import { getContentPreview, MAX_CONTENT_LENGTH } from '@/utils/getContentPreview';
import Image from 'next/image';
import { Review } from '@/types/review.types';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import useMediaQuery from '@/hooks/review/useMediaQuery';
import { ReviewDetailModal } from './ReviewDetailModal';

import { User as SupabaseUser } from '@supabase/auth-js';
import HeartIcon from '../icons/HeartIcon';
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
  signedUserId,
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
  signedUserId: string | undefined;
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
    <div className='flex flex-col justify-between  items-center border-b border-gray-200 border-solid mt-[16px] pb-[16px]'>
      <div className='w-full flex cursor-pointer relative'>
        <div className='w-[88px] h-[88px] desktop:w-[112px] desktop:h-[112px] flex-shrink-0 relative border border-gray-50 rounded-[12px]'>
          {review.image_url && review.image_url.length > 0 ? (
            <Image
              src={review.image_url[0]}
              alt='후기 이미지'
              fill
              priority
              className='object-cover rounded-[12px]'
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
            <div className='w-[24px] h-[24px] text-white text-center absolute right-[4px] bottom-[4px] rounded-[8px] bg-black opacity-60'>
              {review.image_url.length}
            </div>
          )}
        </div>

        <div
          className={`w-full flex flex-col whitespace-pre-wrap break-words ${isExpanded ? 'h-auto' : 'h-[80%] overflow-hidden'}`}
        >
          <div className='flex ml-[16px] items-center  desktop:mb-[12px] justify-between'>
            <div className='flex items-center'>
              {user?.user_metadata.avatar_url && user?.user_metadata.avatar_url.length > 0 ? (
                <div className='w-[24px] h-[24px] relative '>
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

              <h3 className='ml-[8px] text-gray-500 text-[14px] desktop:text-[14px]'>
                {maskIdLastFour(user?.user_metadata.email)}
              </h3>
              <p className='text-gray-500 text-[14px] desktop:text-[14px]'> | {formatDate(review.created_at)}</p>
            </div>
            <button
              onClick={onLikeToggle}
              className=' gap-[4px] text-[12px]  flex items-center justify-center  rounded-[24px]  text-primary-300 '
            >
              <HeartIcon
                isLiked={isLiked}
                signedUserId={signedUserId}
              />

              <span>{likeCount}</span>
            </button>
          </div>

          <div className={`${isExpanded ? 'h-auto' : 'mobile:h-[80px]'} flex pl-[16px] pb-[16px] pr-[16px] pt-[6px] `}>
            <p className='break-words    text-[14px] desktop:text-[16px] font-medium text-gray-800  desktop:text-16px mobile:w-[194px]'>
              {getContentPreview(review.content, isExpanded)}
            </p>
            {review.content.length > MAX_CONTENT_LENGTH && (
              <button
                onClick={onToggle}
                className='text-[10px] border-b border-gray-500 text-gray-500 absolute right-0 bottom-0 desktop:hidden text-right'
              >
                {isExpanded ? '접기' : '더보기'}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className='self-end flex gap-[8px]'>
        {pathname === '/mypage' && (
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
