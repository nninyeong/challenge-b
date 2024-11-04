import { Review } from '@/types/review.types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { User } from '@/types/users.types';
import { GoPlus } from 'react-icons/go';
import { useAuthUserQuery } from '@/hooks/queries/review/useGetReview';
import { formatDate } from '@/utils/formatDate';

type ReviewsCardProp = {
  reviews: Review[];
};

const MAX_CONTENT_LENGTH = 100;
const ReviewCard = ({ reviews }: ReviewsCardProp) => {
  const router = useRouter();
  const [expandedReview, setExpandedReview] = useState<string | null>(null);

  const toggleContent = (id: string) => {
    setExpandedReview((prev) => (prev === id ? null : id));
  };

  const { data: users, isLoading, error } = useAuthUserQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>오류 발생</div>;

  return (
    <div>
      {reviews.map((review) => {
        const handleReviewDetail = () => {
          router.push(`/review/${review.id}`);
        };

        const firstImage = review.image_url?.[0];
        const isExpanded = expandedReview === review.id;

        const sliceContent = (content: string) => {
          return isExpanded
            ? content
            : content.slice(0, MAX_CONTENT_LENGTH) + (content.length > MAX_CONTENT_LENGTH ? '...' : '');
        };

        const user = users?.users.find((user: User) => user.id === review.user_id);

        if (!user) {
          return <div key={review.id}>사용자를 찾을 수 없습니다.</div>;
        }

        return (
          <div
            key={review.id}
            className='w-full h-[152px] flex border border-solid border-l-0 border-r-0 border-t-0 mb-4 cursor-pointer relative'
          >
            <div className='w-[130px] h-[130px] rounded flex flex-shrink-0 relative'>
              <Image
                key={review.id}
                src={firstImage || '/assets/images/defaultImg.png'}
                alt={'후기 이미지'}
                width={100}
                height={100}
                priority
                className='rounded object-cover w-full h-full'
                onClick={firstImage ? handleReviewDetail : undefined}
                sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
              />
              {review?.image_url.length > 1 && (
                <div className='absolute right-1 bottom-1 bg-gray-800 rounded'>
                  <GoPlus size={25} />
                </div>
              )}
            </div>

            <div
              className={`w-[80%] flex flex-col whitespace-pre-wrap break-words ${isExpanded ? 'h-auto' : 'h-[80%] overflow-hidden'}`}
            >
              <div className='w-[16px] y-[16px] overflow-hidden flex ml-4 items-center flex-shrink-0 rounded-full'>
                <Image
                  src={user.user_metadata.avatar_url || '/images/defaultImg.png'}
                  alt='profile'
                  width={30}
                  height={30}
                  className='rounded-full mr-2'
                />
                <h3 className='border border-solid border-l-0 border-t-0 border-b-0 pr-2 mr-2'>
                  {user.user_metadata.name}
                </h3>
                <p>{formatDate(review.created_at)}</p>
              </div>
              <p className='break-words p-4'>{sliceContent(review.content)}</p>
            </div>

            {review.content.length > MAX_CONTENT_LENGTH && (
              <button
                onClick={() => toggleContent(review.id)}
                className='text-sm absolute right-2 bottom-4'
              >
                {isExpanded ? '접기' : '더보기'}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ReviewCard;
