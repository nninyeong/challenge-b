import LinkToCreateCard from '@/components/ui/LinkToCreateCard';

const FixedQuickLink = () => {
  return (
    <div className='border border-gray-200 fixed left-1/2 bottom-[16px] w-[343px] desktop:w-[760px] h-[67px] desktop:h-[76px] bg-white z-50 rounded-[12px] flex justify-between items-center px-[16px] py-[12px] transform -translate-x-1/2'>
      <div className='w-[163px]'>
        <h3 className='text-[16px] text-gray-900 font-bold'>나만의 초대장, 드림카드</h3>
        <p className='text-[12px] text-gray-700 font-medium'>드림카드로 시작하세요.</p>
      </div>
      <LinkToCreateCard buttonStyle='bg-primary-300 w-[134px] desktop:w-[232px] h-[43px] desktop:h-[48px] text-[16px] text-white font-bold rounded-[12px]' />
    </div>
  );
};

export default FixedQuickLink;
