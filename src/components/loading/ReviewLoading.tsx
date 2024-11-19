'use client';
import useMediaQuery from '@/hooks/review/useMediaQuery';

export const ReviewImageLoading = () => {
  const isDesktop = useMediaQuery('(min-width: 1440px)');

  const length = isDesktop ? 8 : 4;

  return (
    <div className='w-full grid grid-cols-4 desktop:grid-cols-8 gap-[13px] desktop:gap-[24px] mt-[20px] desktop:mt-[54px] mb-[16px] pb-[16px] desktop:pb-[80px] border-b border-gray-50'>
      {Array.from({ length }).map((_, index) => (
        <div
          key={index}
          className='w-full h-0 pb-[100%] bg-gray-50 animate-pulse rounded-lg relative'
        />
      ))}
    </div>
  );
};

export const ReviewCardLoading = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className='flex flex-col justify-between items-center border-b border-gray-50 border-solid mb-[16px] pb-[16px] animate-pulse'
        >
          <div className='w-full flex cursor-pointer relative'>
            <div className='w-[88px] h-[88px] desktop:w-[112px] desktop:h-[112px] flex-shrink-0 bg-gray-50 rounded-[12px]' />

            <div className='w-full flex flex-col ml-[16px]'>
              <div className='flex justify-between items-center mb-2 '>
                <div className='flex items-center'>
                  <div className='w-[30px] h-[30px] bg-gray-50 rounded-full' />
                  <div
                    className='ml-[8px] w-[100px] h-[12px]
                   bg-gray-50 rounded'
                  />
                </div>

                <div className='w-[43px] h-[18px] bg-gray-50 rounded-full' />
              </div>
              <div className='h-[40px] desktop:h-[66px] w-full bg-gray-50 rounded mb-2' />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export const ReviewDetailLoading = () => {
  return <div className='w-[571px] h-[780px] bg-gray-50 ' />;
};
