import { useFormContext } from 'react-hook-form';

const NavigationDetailInput = () => {
  const { register } = useFormContext();
  return (
    <>
      <div>
        <div>세부사항</div>
        <label className='text-[14px]'>
          <input
            type='checkbox'
            className='mr-2'
            {...register('navigation_detail.map')}
          />
          지도 사용
        </label>
      </div>
      <div>
        <label>
          <input
            type='checkbox'
            className='mr-2'
            {...register('navigation_detail.navigation_button')}
          />
          <span className='text-[14px]'>네비게이션 앱 버튼 표시</span>
          <span className='text-[12px] text-gray-400'>(카카오내비, 티맵, 네이버)</span>
        </label>
      </div>
      <div>
        <div>교통수단 표시</div>
        <label className='w-[50px]'>지하철</label>
        <input
          type='text'
          placeholder='지하철역에서 얼마나 걸리는가'
          {...register('navigation_detail.subway')}
          className='h-[32px] w-[250px] pl-[8px] py-[9px] border text-[12px] rounded-[8px] text-black'
        />
        <label className='w-[50px]'>버스</label>
        <input
          type='text'
          placeholder='몇번을 타고 어디에서 내리세요'
          {...register('navigation_detail.bus')}
          className='h-[32px] w-[250px] pl-[8px] py-[9px] border text-[12px] rounded-[8px] text-black'
        />
      </div>
    </>
  );
};

export default NavigationDetailInput;
