import LinkToCreateCard from '@/components/ui/LinkToCreateCard';

const FixedQuickLink = () => {
  return (
    <div className='border border-gray-200 fixed left-0 right-0 bottom-[16px] x-[343px] h-[67px] bg-white z-50 rounded-[12px] flex justify-between items-center mx-auto px-[16px] py-[12px]'>
      <div className='flex-1'>
        <h3 className='text-[16px] text-gray-900 font-bold'>나만의 청첩장 만들기</h3>
        <p className='text-[12px] text-gray-700 font-medium'>바로 제작해보세요!</p>
      </div>
      <LinkToCreateCard buttonStyle='bg-primary-300 w-[134px] h-[43px] text-[16px] text-white font-bold rounded-[12px]' />
    </div>
  );
};

export default FixedQuickLink;
