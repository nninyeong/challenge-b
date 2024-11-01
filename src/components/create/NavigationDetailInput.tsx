import { useFormContext } from 'react-hook-form';

const NavigationDetailInput = () => {
  const { register } = useFormContext();
  return (
    <>
      <div className='mb-[14px] text-[18px] font-bold text-gray-900'>교통수단 표시</div>
      <div className='mb-[14px]'>
        <label className='text-[14px] text-gray-600 flex items-center cursor-pointer'>
          <input
            type='checkbox'
            className='hidden peer'
            {...register('navigationDetail.map')}
          />
          <img
            src='/assets/images/icons/selected-on.svg'
            alt='지도 표시 활성화'
            className='peer-checked:inline hidden'
          />
          <img
            src='/assets/images/icons/selected-off.svg'
            alt='지도 표시 비활성화'
            className='peer-checked:hidden inline'
          />
          <span className='ml-2'>지도 표시</span>
        </label>
      </div>
      <div className='mb-8'>
        <label className='text-[14px] text-gray-600 flex items-center cursor-pointer'>
          <input
            type='checkbox'
            className='hidden peer'
            {...register('navigationDetail.navigationButton')}
          />
          <img
            src='/assets/images/icons/selected-on.svg'
            alt='네비게이션 버튼 활성화'
            className='peer-checked:inline hidden'
          />
          <img
            src='/assets/images/icons/selected-off.svg'
            alt='네비게이션 버튼 비활성화'
            className='peer-checked:hidden inline'
          />
          <span className='ml-2'>네비게이션 앱 버튼 표시</span>
          <span className='text-[12px] text-gray-600'>(카카오맵, 티맵, 네이버)</span>
        </label>
      </div>
      <div className='flex flex-col gap-3'>
        <div className='flex justify-between w-full gap-4'>
          <label className='flex justify-start items-center text-[14px] w-14 text-gray-700'>지하철</label>
          <textarea
            placeholder='오시는 길 내용을 입력하세요.'
            {...register('navigationDetail.subway')}
            className='h-[64px] w-full pl-[8px] py-[9px] border text-[12px] rounded-[8px] text-black resize-none'
          />
        </div>
        <div className='flex justify-between'>
          <label className='flex justify-start items-center text-[14px] w-14 mr-4 text-gray-700'>버스</label>
          <textarea
            placeholder='오시는 길 내용을 입력하세요.'
            {...register('navigationDetail.bus')}
            className='h-[64px] w-full pl-[8px] py-[9px] border text-[12px] rounded-[8px] text-black resize-none'
          />
        </div>
      </div>
    </>
  );
};

export default NavigationDetailInput;
