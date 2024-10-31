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
        <div className='text-[18px] font-bold'>방명록</div>
        <label>
          <input
            type='checkbox'
            {...register('guestbook')}
          />
          {guestBookCondition ? <span>방명록 사용</span> : <span>사용안함</span>}
        </label>
      </div>
      <div>
        <div className='text-[18px] font-bold'>디데이</div>
        <label>
          <input
            type='checkbox'
            {...register('dDay')}
          />
          {dDayCondition ? <span>디데이 사용</span> : <span>사용안함</span>}
        </label>
      </div>
      <div>
        <div className='text-[18px] font-bold'>참석의사 · RSVP</div>
        <label>
          <input
            type='checkbox'
            {...register('attendance')}
          />
          {attendanceCondition ? <span>참석 의사 전달 사용</span> : <span>사용안함</span>}
        </label>
      </div>
    </>
  );
};
export default GuestInfoInput;
