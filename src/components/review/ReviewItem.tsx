import { formatDate } from '@/utils/formatDate';
import { maskIdLastFour } from '@/utils/maskIdLastFour';
import { getContentPreview, MAX_CONTENT_LENGTH } from '@/utils/getContentPreview';
import Image from 'next/image';
import { Review } from '@/types/review.types';
import { User } from '@/types/users.types';
import { Notify } from 'notiflix';
const ReviewItem = ({
  review,
  user,
  isExpanded,
  onToggle,
  onNavigate,
}: {
  review: Review;
  user: User;
  isExpanded: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) => {
  const firstImage = review.image_url?.[0] || '/assets/images/defaultImg.png';
  const handleNotYetButton = () => {
    Notify.info('아직 준비중인 기능입니다.');
  };
  return (
    <div className='flex flex-col justify-between min-h-[159px] items-center border-b border-gray-50 border-solid mb-4 pb-[15px]'>
      <div className='w-full flex cursor-pointer relative'>
        <div className='w-[80px] h-[80px] flex-shrink-0 relative'>
          <Image
            src={firstImage}
            alt='후기 이미지'
            fill
            priority
            objectFit='cover'
            className='rounded-[12px] h-full'
            onClick={firstImage ? onNavigate : undefined}
            sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
          />
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
            <Image
              src={user.user_metadata.avatar_url || '/images/defaultImg.png'}
              alt='profile'
              width={30}
              height={30}
              className='rounded-full h-[30px]'
            />
            <h3 className='ml-[8px] text-gray-500'>{maskIdLastFour(user.user_metadata.email)}</h3>
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
          className='text-[12px] flex items-center justify-center border-primary-300 border-[1px] border-solid rounded-[90px] w-[76px] h-[24px] text-primary-300'
          onClick={handleNotYetButton}
        >
          <img
            src='/assets/images/icons/smiley-happy.svg'
            alt='도움돼요'
          />
          <span>도움돼요</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewItem;
