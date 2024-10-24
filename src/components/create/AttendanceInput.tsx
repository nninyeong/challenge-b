import { useFormContext } from "react-hook-form";

const AttendanceInput = () => {
  const { register } = useFormContext();
  return (
    <div>
      <label>
        <input
          type="checkbox"
          {...register('showAttendanceButton')}
        />
        출석 버튼 보기
      </label>
    </div>
  );
};
export default AttendanceInput;