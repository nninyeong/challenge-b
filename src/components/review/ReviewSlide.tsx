'use client';
import Image from 'next/image';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ReviewSlide = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const isFirstImage = currentIndex === 0;
  const isLastImage = currentIndex === images.length - 1;
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <>
      <Image
        src={images[currentIndex]}
        fill
        alt={`리뷰 이미지`}
        className='object-cover'
        priority
      />
      {!isFirstImage && (
        <button
          onClick={() => handlePrevious()}
          className='absolute flex items-center justify-center left-4 top-1/2 transform -translate-y-1/2 bg-black/60 text-white px-4 py-2 rounded-full z-50 w-[40px] h-[40px] desktop:w-[70px] desktop:h-[70px] desktop:left-[-100px]'
        >
          <FaChevronLeft className='w-[28px] h-[28px] desktop:w-[32px] desktop:h-[32px]' />
        </button>
      )}
      {!isLastImage && (
        <button
          onClick={() => handleNext()}
          className='flex items-center justify-center absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 text-white px-4 py-2 rounded-full z-50 w-[40px] h-[40px] desktop:w-[70px] desktop:h-[70px] desktop:right-[-100px] '
        >
          <FaChevronRight className='w-[28px] h-[28px] desktop:w-[32px] desktop:h-[32px]' />
        </button>
      )}
    </>
  );
};

export default ReviewSlide;
