import AttendanceButton from '@/components/attendance/AttendanceButton';
import DdayCounter from '@/components/ddaycounter/DdayCounter';

type Props = {
  attendanceButton: boolean;
  dDayCount: boolean;
  weddingInfoDate: string;
  leftName: string;
  rightName: string;
  icon: string;
};

const EventStatus = (props: Props) => {
  return (
    <div className={`w-full flex justify-between text-primary300`}>
      <div className='flex flex-col gap-2'>
        <div className='flex gap-2 font-bold'>
          <span>{props.leftName}</span>
          <span>{props.icon}</span>
          <span>{props.rightName}</span>
        </div>
        <DdayCounter weddingInfoDate={props.weddingInfoDate} />
      </div>
      {props.attendanceButton && <AttendanceButton />}
    </div>
  );
};

export default EventStatus;
