import { useFormContext } from 'react-hook-form';

const WeddingInfoInput = () => {
  const { register } = useFormContext();
  return (
    <div className='flex flex-col gap-[8px]'>
      <h3 className='font-bold'>예식 일시</h3>
      <div className='grid grid-cols-[60px_1fr]'>
        <label className='leading-[32px]'>예식일</label>
        <input
          {...register('wedding_info.date')}
          placeholder='2024-11-21'
          className='h-[32px] rounded pl-3'
        />
      </div>
    </div>
  );
};

export default WeddingInfoInput;
