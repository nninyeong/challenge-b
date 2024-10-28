import { useFormContext } from 'react-hook-form';

const NavigationDetailInput = () => {
  const { register } = useFormContext();
  return (
    <>
      <div>교통수단 표시</div>
      <div>
        <label className='text-[14px]'>
          <input
            type='checkbox'
            className='mr-2'
            {...register('navigationDetail.map')}
          />
          지도 표시
        </label>
      </div>
      <div>
        <label>
          <input
            type='checkbox'
            className='mr-2'
            {...register('navigationDetail.navigationButton')}
          />
          <span className='text-[14px]'>네비게이션 앱 버튼 표시</span>
          <span className='text-[12px] text-gray-400'>(카카오내비, 티맵, 네이버)</span>
        </label>
      </div>
      <div className='flex flex-col gap-3'>
        <div className='flex justify-between w-full gap-4'>
          <label className='flex justify-start items-center text-[14px] w-14'>지하철</label>
          <input
            type='text'
            placeholder='오시는 길 내용을 입력하세요.'
            {...register('navigation_detail.subway')}
            className='h-[32px] w-full pl-[8px] py-[9px] border text-[12px] rounded-[8px] text-black'
          />
        </div>
        <div className='flex justify-between'>
          <label className='flex justify-start items-center text-[14px] w-14 mr-4'>버스</label>
          <input
            type='text'
            placeholder='오시는 길 내용을 입력하세요.'
            {...register('navigation_detail.bus')}
            className='h-[32px] w-full pl-[8px] py-[9px] border text-[12px] rounded-[8px] text-black'
          />
        </div>
      </div>
    </>
  );
};

export default NavigationDetailInput;
