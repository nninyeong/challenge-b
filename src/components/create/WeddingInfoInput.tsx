import { useFormContext } from 'react-hook-form';

const WeddingInfoInput = () => {
  const { register } = useFormContext();
  return (
    <div className='flex flex-col gap-[8px]'>
      <h3 className='font-bold'>예식 일시</h3>
      <div className='grid grid-cols-[80px_1fr]'>
        <label className='leading-[32px]'>예식일</label>
        <input
          {...register('wedding_info.date')}
          placeholder='2024-11-21'
          className='h-[32px] rounded pl-3'
        />
      </div>
      <div className='grid grid-cols-[80px_1fr]'>
        <label>예식 시간</label>
        <div className='flex gap-[8px]'>
          <select
            {...register('wedding_info.time.hour')}
            className='h-[32px] rounded flex-1'
            defaultValue='00'
          >
            {Array(24)
              .fill(null)
              .map((_, hour) => (
                <option value={String(hour).padStart(2, '0')}>{String(hour).padStart(2, '0')}시</option>
              ))}
          </select>
          <select
            {...register('wedding_info.time.minute')}
            className='h-[32px] rounded flex-1'
            defaultValue='00'
          >
            <option value='00'>00분</option>
            <option value='30'>30분</option>
          </select>
        </div>
      </div>
      <h3 className='font-bold'>예식 장소</h3>
      <div className='grid grid-cols-[80px_1fr]'>
        <label className='leading-[32px]'>주소</label>
        <div className='grid grid-cols-[1fr_auto] gap-[8px]'>
          <input
            readOnly={true}
            value='검색한 주소 연결?'
            className='h-[32px] rounded pl-3 min-w-0'
            {...register('wedding_info.weddingHallAddress')}
          />
          <button className='bg-primary300 rounded w-[55px] h-[32px] text-white font-bold'>검색</button>
        </div>
      </div>
      <div className='grid grid-cols-[80px_1fr]'>
        <label className='leading-[32px]'>예식장명</label>
        <input
          className='h-[32px] rounded pl-3'
          {...register('wedding_info.weddingHallName')}
        />
      </div>
      <div className='grid grid-cols-[80px_1fr]'>
        <label className='leading-[32px]'>연락처</label>
        <input
          className='h-[32px] rounded pl-3'
          {...register('wedding_info.weddingHallContact')}
        />
      </div>
    </div>
  );
};

export default WeddingInfoInput;
