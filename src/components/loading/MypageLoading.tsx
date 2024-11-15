export const MyInvitationCardLoading = () => {
  return (
    <div className='flex justify-between items-center w-full h-[152px] flex mx-auto rounded-xl mt-8 bg-gray-50 p-4 animate-pulse'>
      <div className='w-[90px] h-[90px] rounded-full bg-gray-200' />
      <div>
        <div className='flex justify-between'>
          <p className='text-[16px] mb-4'>내 청첩장</p>
          <div className='w-[24px] h-[24px] rounded-full bg-gray-200' />
        </div>
        <div className='flex gap-2 mb-2'>
          <div className='w-[78px] h-[28px] rounded-xl bg-gray-200' />
          <div className='w-[78px] h-[28px] rounded-xl bg-gray-200' />
        </div>
        <div className='w-[163px] h-[44px] rounded-xl bg-gray-200' />
      </div>
    </div>
  );
};

export const TogglePrivateLoading = () => {
  return <div className='w-14 h-8 rounded-full bg-gray-200 animate-pulse' />;
};
