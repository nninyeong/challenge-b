import { useFormContext, useWatch } from "react-hook-form";

const GuestInfoInput = () => {
  const { register } = useFormContext();
  const attendanceCondition = useWatch({
    name: 'attendance',
  });
  const guestBookCondition = useWatch({
    name: 'guestbook',
  });
  return (
    <>
      <div>
        <div>방명록</div>
        <label>
          <input
            type="checkbox"
            {...register('guestbook')}
          />
          {guestBookCondition ? "방명록 사용" : "사용안함"}
        </label>
      </div>
      <div>
        <div>참석의사 · RSVP</div>
        <label>
          <input
            type="checkbox"
            {...register('attendance')}
          />
          {attendanceCondition ? "참석 의사 전달 사용" : "사용안함"}
        </label>
      </div>
    </>
  );
};
export default GuestInfoInput;