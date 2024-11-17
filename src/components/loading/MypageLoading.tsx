export const MyInvitationCardLoading = () => {
  return (
    <div className='flex justify-between desktop:justify-center items-center w-full h-[152px] desktop:w-[774px] desktop:h-[228px] gap-4 desktop:gap-14 mx-auto rounded-xl bg-gray-50 p-4 animate-pulse'>
      <div className='w-[90px] h-[90px] desktop:w-[136px] desktop:h-[136px] rounded-full bg-gray-200' />

      <div className='flex flex-col justify-between desktop:w-[420px] gap-2'>
        <div className='flex justify-between items-center mb-2 desktop:mb-7'>
          <p className='text-[16px] font-bold desktop:text-[20px]'>내 청첩장</p>
          <div className='w-[24px] h-[24px] desktop:w-[32px] desktop:h-[32px] bg-gray-200 rounded-full' />
        </div>

        <div className='flex gap-2 mb-2'>
          <div className='w-[78px] h-[28px] desktop:w-[100px] desktop:h-[36px] rounded-xl bg-gray-200' />
          <div className='w-[78px] h-[28px] desktop:w-[100px] desktop:h-[36px] rounded-xl bg-gray-200' />
        </div>

        <div className='w-[163px] desktop:w-full h-[44px] rounded-xl bg-gray-200' />
      </div>
    </div>
  );
};

export const TogglePrivateLoading = () => {
  return <div className='w-14 h-8 rounded-full bg-gray-200 animate-pulse' />;
};
