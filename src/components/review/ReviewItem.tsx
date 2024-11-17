'use client';
import { formatDate } from '@/utils/formatDate';
import { maskIdLastFour } from '@/utils/maskIdLastFour';
import { getContentPreview, MAX_CONTENT_LENGTH } from '@/utils/getContentPreview';
import Image from 'next/image';
import { Review } from '@/types/review.types';
import { User } from '@/types/users.types';
import { Notify } from 'notiflix';
import { usePathname } from 'next/navigation';
import { useDeleteReviewMutation } from '@/hooks/queries/review/useDeleteReviewMutation';
import SmileyHappy from '../icons/SmileyHappy';

const ReviewItem = ({
  review,
  user,
  isExpanded,
  onToggle,
  onNavigate,
  onLikeToggle,
  isLiked,
  likeCount,
}: {
  review: Review;
  user: User | undefined;
  isExpanded: boolean;
  onToggle: () => void;
  onNavigate: () => void;
  onLikeToggle: () => void;
  isLiked: boolean;
  likeCount: number | string;
}) => {
  const pathname = usePathname();

  const { mutate: deleteMyReview } = useDeleteReviewMutation();

  const handleDeleteMyReview = () => {
    deleteMyReview(review.id);
  };
  console.log(user, 'usesfjiefjei');
  const handleNotYetButton = () => {
    Notify.info('준비중인 서비스입니다.');
  };

  return (
    <div className='flex flex-col justify-between min-h-[159px] items-center border-b border-gray-50 border-solid mb-4 pb-[15px]'>
      <div className='w-full flex cursor-pointer relative'>
        <div className='w-[80px] h-[80px] flex-shrink-0 relative'>
          {review.image_url && review.image_url.length > 0 ? (
            <Image
              src={review.image_url[0]}
              alt='후기 이미지'
              fill
              priority
              objectFit='cover'
              className='rounded-[12px] h-full'
              onClick={review.image_url ? onNavigate : undefined}
              sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
            />
          ) : (
            <img
              src='/assets/images/card/no-review.svg'
              alt='no review'
            />
          )}
          {review.image_url.length > 1 && (
            <div className='absolute right-1 bottom-1 rounded'>
              <img
                src='/assets/images/icons/layers-1.svg'
                alt='more images icon'
              />
            </div>
          )}
        </div>

        <div
          className={`w-full flex flex-col whitespace-pre-wrap break-words ${isExpanded ? 'h-auto' : 'h-[80%] overflow-hidden'}`}
        >
          <div className='flex ml-[16px] items-center text-[12px]'>
            {user?.user_metadata.avatar_url && user?.user_metadata.avatar_url.length > 0 ? (
              <Image
                src={user.user_metadata.avatar_url || '/assets/images/defaultImg.png'}
                alt='profile'
                width={30}
                height={30}
                className='rounded-full h-[30px]'
              />
            ) : (
              <Image
                src='/assets/images/defaultImg.png'
                alt='profile'
                width={30}
                height={30}
                className='rounded-full h-[30px]'
              />
            )}
            <h3 className='ml-[8px] text-gray-500'>{maskIdLastFour(user?.user_metadata.email)}</h3>
            <p className='text-gray-500'> | {formatDate(review.created_at)}</p>
          </div>
          <p
            className='break-words p-4 leading-[140%] text-[12px] text-gray-800 w-full'
            style={{ letterSpacing: '-0.2%' }}
          >
            {getContentPreview(review.content, isExpanded)}
          </p>
        </div>

        {review.content.length > MAX_CONTENT_LENGTH && (
          <button
            onClick={onToggle}
            className='text-[10px] border-b border-gray-500 text-gray-500 absolute right-2 bottom-4'
            style={{ letterSpacing: '-0.2%' }}
          >
            {isExpanded ? '접기' : '더보기'}
          </button>
        )}
      </div>
      <div className='self-end flex gap-[8px]'>
        {pathname === '/mypage' ? (
          <button
            className='text-[12px] flex items-center justify-center border-primary-300 border-[1px] border-solid rounded-[90px] w-[76px] h-[24px] text-primary-300'
            onClick={handleDeleteMyReview}
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
              className='text-[12px] flex items-center justify-center border-primary-300 border-[1px] border-solid rounded-[90px] w-[76px] h-[24px] text-primary-300'
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
              className={`text-[12px] flex items-center justify-center border-primary-300 border-[1px] border-solid rounded-[90px] w-[100px] h-[24px] text-primary-300 ${isLiked && 'bg-primary-300 '} `}
            >
              <SmileyHappy isLiked={isLiked} />
              <span className={`${isLiked ? 'text-white' : ''}`}>도움돼요({likeCount})</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewItem;
