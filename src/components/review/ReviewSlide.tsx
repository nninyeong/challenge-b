'use client';
import Image from 'next/image';
import { useState } from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

const ReviewSlide = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
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
      <button
        onClick={() => handlePrevious()}
        className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/50 text-black px-4 py-2 rounded-full z-50'
      >
        <MdNavigateBefore />
      </button>
      <button
        onClick={() => handleNext()}
        className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/50 text-black px-4 py-2 rounded-full z-50 cursor-pointer'
      >
        <MdNavigateNext />
      </button>
    </>
  );
};

export default ReviewSlide;
