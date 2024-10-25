import { useFormContext } from "react-hook-form";

const AttendanceInput = () => {
  const { register } = useFormContext();
  return (
    <>
      <div>
        <label>
          <input
            type="checkbox"
            {...register('attendance')}
          />
          참석 의사 전달 사용
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            {...register('guestbook')}
          />
          방명록 사용
        </label>
      </div>
    </>
  );
};
export default AttendanceInput;