'use client';
import Image from 'next/image';
import { useState } from 'react';
type PropsType = {
  writer: string;
  content: string;
  created: string;
};
const MAX_CONTENT_LENGTH = 50 as const;
const ReviewContentsBox = ({ writer, content, created }: PropsType) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const convertedCreatedDate = new Date(created).toLocaleDateString('ko-KR').slice(0, -1);

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
    <div className='w-full absolute bottom-0 left-0 p-6 text-white flex flex-col justify-center'>
      <div className='flex justify-start items-center gap-3 text-sm'>
        <Image
          src='/images/defaultImg.jpg'
          width={30}
          height={30}
          alt='default'
          className='rounded-full'
        />
        <p>{writer}</p> | <span>{convertedCreatedDate}</span>
      </div>
      <div className='flex flex-col'>
        <p className='mt-5 break-words'>{sliceContent(content)}</p>
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
