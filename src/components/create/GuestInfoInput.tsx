import { useFormContext, useWatch } from 'react-hook-form';

const GuestInfoInput = () => {
  const { register } = useFormContext();
  const attendanceCondition = useWatch({
    name: 'attendance',
  });
  const guestBookCondition = useWatch({
    name: 'guestbook',
  });
  const dDayCondition = useWatch({
    name: 'dDay',
  });
  return (
    <>
      <div>
        <label>
          <input
            type='checkbox'
            {...register('guestbook')}
            className='hidden'
          />
          <div
            className={`relative w-[43px] h-[30px] rounded-full cursor-pointer transition-colors duration-300 ${guestBookCondition ? 'bg-primary-300' : 'bg-gray-400'}`}
          >
            <div
              className='absolute w-[18px] h-[18px] bg-white rounded-full top-1.5 left-1.5 transition-transform duration-300 transform-gpu'
              style={{ transform: guestBookCondition ? 'translateX(13px)' : '' }}
            ></div>
          </div>
          <span className={`${guestBookCondition ? 'text-primary-300' : 'text-gray-400'}`}>
            {guestBookCondition ? '방명록 사용' : '사용안함'}
          </span>
        </label>
      </div>
      <div>
        <div className='text-[18px] font-bold text-gray-900 mb-4'>디데이 · 참석의사 · RSVP</div>
        <label className='flex items-center gap-2 mb-[14px]'>
          <input
            type='checkbox'
            {...register('dDay')}
            {...register('attendance')}
            className='hidden'
          />
          <div
            className={`relative w-[43px] h-[30px] rounded-full cursor-pointer transition-colors duration-300 ${dDayCondition && attendanceCondition ? 'bg-primary-300' : 'bg-gray-400'}`}
          >
            <div
              className='absolute w-[18px] h-[18px] bg-white rounded-full top-1.5 left-1.5 transition-transform duration-300 transform-gpu'
              style={{ transform: dDayCondition && attendanceCondition ? 'translateX(13px)' : '' }}
            ></div>
          </div>
          <span className={`${dDayCondition && attendanceCondition ? 'text-primary-300' : 'text-gray-400'}`}>
            {dDayCondition && attendanceCondition ? '사용함' : '사용안함'}
          </span>
        </label>
      </div>
    </>
  );
};
export default GuestInfoInput;
