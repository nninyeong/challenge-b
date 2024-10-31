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
        <div className='text-[18px] font-bold text-gray-900 mb-4'>방명록</div>
        <label className='flex items-center gap-2'>
          <input
            type='checkbox'
            {...register('guestbook')}
            className='hidden'
          />
          <div
            className={`relative w-[43px] h-[30px] mb-[14px] rounded-full cursor-pointer transition-colors duration-300 ${guestBookCondition ? 'bg-primary-300' : 'bg-gray-300'}`}
          >
            <div
              className='absolute w-[18px] h-[18px] bg-white rounded-full top-1.5 left-1.5 transition-transform duration-300 transform-gpu'
              style={{ transform: guestBookCondition ? 'translateX(13px)' : '' }}
            ></div>
          </div>
          <span className={`${guestBookCondition ? 'text-primary-300' : 'text-gray-500'}`}>
            {guestBookCondition ? '방명록 사용' : '사용안함'}
          </span>
        </label>
      </div>
      <div>
        <div className='text-[18px] font-bold text-gray-900 mb-4'>디데이</div>
        <label className='flex items-center gap-2'>
          <input
            type='checkbox'
            {...register('dDay')}
            className='hidden'
          />
          <div
            className={`relative w-[43px] h-[30px] mb-[14px] rounded-full cursor-pointer transition-colors duration-300 ${dDayCondition ? 'bg-primary-300' : 'bg-gray-300'}`}
          >
            <div
              className='absolute w-[18px] h-[18px] bg-white rounded-full top-1.5 left-1.5 transition-transform duration-300 transform-gpu'
              style={{ transform: dDayCondition ? 'translateX(13px)' : '' }}
            ></div>
          </div>
          <span className={`${dDayCondition ? 'text-primary-300' : 'text-gray-500'}`}>
            {dDayCondition ? '디데이 사용' : '사용안함'}
          </span>
        </label>
      </div>
      <div>
        <div className='text-[18px] font-bold text-gray-900 mb-4'>참석의사 · RSVP</div>
        <label className='flex items-center gap-2'>
          <input
            type='checkbox'
            {...register('attendance')}
            className='hidden'
          />
          <div
            className={`relative w-[43px] h-[30px] mb-[14px] rounded-full cursor-pointer transition-colors duration-300 ${attendanceCondition ? 'bg-primary-300' : 'bg-gray-300'}`}
          >
            <div
              className='absolute w-[18px] h-[18px] bg-white rounded-full top-1.5 left-1.5 transition-transform duration-300 transform-gpu'
              style={{ transform: attendanceCondition ? 'translateX(13px)' : '' }}
            ></div>
          </div>
          <span className={`${attendanceCondition ? 'text-primary-300' : 'text-gray-500'}`}>
            {attendanceCondition ? '참석 의사 전달 사용' : '사용안함'}
          </span>
        </label>
      </div>
    </>
  );
};
export default GuestInfoInput;
