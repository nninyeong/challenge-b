import LinkToCreateCard from '@/components/ui/LinkToCreateCard';

const FixedQuickLink = () => {
  return (
    <div className='fixed bottom-[16px] w-[343px] h-[64px] bg-white z-50 rounded-[12px] flex justify-between items-center gap-[8px] p-[8px]'>
      <img
        src='/assets/images/branding/logoIcon.svg'
        className='w-[48px] h-[48px]'
        alt='드림카드'
      />
      <div className='flex-1'>
        <h3 className='text-[16px] font-bold'>나만의 청첩장</h3>
        <p className='text-[12px]'>바로 제작해보세요!</p>
      </div>
      <LinkToCreateCard />
    </div>
  );
};

export default FixedQuickLink;
