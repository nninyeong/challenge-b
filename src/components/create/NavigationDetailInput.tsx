import { useFormContext } from 'react-hook-form';

const NavigationDetailInput = () => {
  const { register } = useFormContext();
  return (
    <>
      <div className='mb-[14px]'>
        <label className='text-[14px] text-gray-600 flex items-center cursor-pointer'>
          <input
            type='checkbox'
            className='hidden peer'
            {...register('navigationDetail.map')}
          />
          <img
            src='/assets/images/icons/selected-on.webp'
            alt='지도 표시 활성화'
            className='peer-checked:inline hidden w-4 h-4'
            loading='lazy'
          />
          <img
            src='/assets/images/icons/selected-off.webp'
            alt='지도 표시 비활성화'
            className='peer-checked:hidden inline w-4 h-4'
            loading='lazy'
          />
          <span className='ml-2'>지도 표시</span>
        </label>
      </div>
      <div className='mb-[41px]'>
        <label className='text-[14px] text-gray-600 flex items-center cursor-pointer'>
          <input
            type='checkbox'
            className='hidden peer'
            {...register('navigationDetail.navigationButton')}
          />
          <img
            src='/assets/images/icons/selected-on.webp'
            alt='네비게이션 버튼 활성화'
            className='peer-checked:inline hidden w-4 h-4'
            loading='lazy'
          />
          <img
            src='/assets/images/icons/selected-off.webp'
            alt='네비게이션 버튼 비활성화'
            className='peer-checked:hidden inline w-4 h-4'
            loading='lazy'
          />
          <span className='ml-2'>네비게이션 앱 버튼 표시</span>
          <span className='text-[12px] text-gray-600'>(카카오맵, 티맵, 네이버)</span>
        </label>
      </div>
      <div className='flex flex-col gap-2 text-[12px] text-gray-900'>
        <div className='flex justify-between'>
          <label className='flex justify-start pt-2 text-[14px] w-14 mr-4 text-gray-700 font-medium'>버스</label>
          <textarea
            placeholder='오시는 길 내용을 입력하세요.'
            {...register('navigationDetail.bus')}
            className='h-[64px] w-full pl-[8px] py-[9px] border-[.5px] border-gray-300 rounded-[8px] resize-none'
            maxLength={70}
          />
        </div>
        <div className='flex justify-between w-full gap-4'>
          <label className='flex justify-start pt-2 text-[14px] w-14 text-gray-700 font-medium'>지하철</label>
          <textarea
            placeholder='오시는 길 내용을 입력하세요.'
            {...register('navigationDetail.subway')}
            maxLength={70}
            className='h-[64px] w-full pl-[8px] py-[9px] border-[.5px] border-gray-300 rounded-[8px] resize-none'
          />
        </div>
      </div>
    </>
  );
};

export default NavigationDetailInput;
