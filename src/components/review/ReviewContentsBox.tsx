'use client';
import { User } from '@/types/users.types';
import { maskIdLastFour } from '@/utils/maskIdLastFour';
import Image from 'next/image';
import { useState } from 'react';
type PropsType = {
  content: string;
  created: string;
  avatar_url: string | null;
  user: User;
};
const MAX_CONTENT_LENGTH = 50 as const;
const ReviewContentsBox = ({ content, created, avatar_url, user }: PropsType) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const convertedCreatedDate = new Date(created)
    .toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
    .replace(/\.\s/g, '.')
    .slice(0, -1);

  const toggleContent = () => {
    setIsExpanded((prev) => !prev);
  };

  const sliceContent = (review: string) => {
    const isContentLengthOverMaxLength = review.length > MAX_CONTENT_LENGTH;
    if (isExpanded) {
      return review;
    }
    return review.slice(0, MAX_CONTENT_LENGTH) + (isContentLengthOverMaxLength ? '...' : '');
  };
  return (
    <div className='w-full absolute bottom-0 left-0 p-[16px] text-white flex flex-col justify-center'>
      <div className='flex justify-start items-center text-[12px]'>
        <Image
          src={avatar_url === null ? '/assets/images/defaultImg.png' : avatar_url}
          width={30}
          height={30}
          alt='default'
          className='rounded-full'
        />
        <p className='pl-[8px]'>{maskIdLastFour(user?.user_metadata?.email) ?? '****'}</p> <p className='px-[4px]'>|</p>
        <span>{convertedCreatedDate}</span>
      </div>
      <div className='flex flex-col mt-[14px] mb-[8px]'>
        <p className='break-words text-[12px]'>{sliceContent(content)}</p>
        {content.length > MAX_CONTENT_LENGTH && (
          <button
            onClick={toggleContent}
            className='text-sm hover:underline self-end'
          >
            {isExpanded ? '접기' : '더보기'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewContentsBox;
