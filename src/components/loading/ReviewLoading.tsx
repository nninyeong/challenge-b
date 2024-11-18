'use client';
import useMediaQuery from '@/hooks/review/useMediaQuery';

export const ReviewImageLoading = () => {
  const isDesktop = useMediaQuery('(min-width: 1440px)');

  const length = isDesktop ? 8 : 4;

  return (
    <div className='w-full grid grid-cols-4 desktop:grid-cols-8 gap-[13px] mt-[20px] mb-[24px]'>
      {Array.from({ length }).map((_, index) => (
        <div
          key={index}
          className='w-full h-0 pb-[100%] bg-gray-200 animate-pulse rounded-lg relative'
        />
      ))}
    </div>
  );
};

export const ReviewCardLoading = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className='flex flex-col justify-between min-h-[159px] items-center border-b border-gray-50 border-solid mb-4 pb-[15px] animate-pulse'
        >
          <div className='w-full flex cursor-pointer relative'>
            <div className='w-[80px] h-[80px] flex-shrink-0 bg-gray-50 rounded-[12px]' />
            <div className='w-full flex flex-col ml-[16px]'>
              <div className='flex items-center mb-2'>
                <div className='w-[30px] h-[30px] bg-gray-50 rounded-full' />
                <div className='ml-[8px] w-[100px] h-[12px] bg-gray-50 rounded' />
              </div>
              <div className='h-[40px] w-full bg-gray-50 rounded mb-2' />
            </div>
          </div>
          <div className='self-end flex gap-[8px] mt-2'>
            <div className='w-[76px] h-[24px] bg-gray-50 rounded-[90px]' />
            <div className='w-[76px] h-[24px] bg-gray-50 rounded-[90px]' />
          </div>
        </div>
      ))}
    </>
  );
};

export const ReviewDetailLoading = () => {
  return <div className='w-[571px] h-[780px] bg-gray-50 ' />;
};
