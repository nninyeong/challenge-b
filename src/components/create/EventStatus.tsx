import AttendanceButton from '@/components/attendance/AttendanceButton';
import DdayCounter from '@/components/ddaycounter/DdayCounter';

type Props = {
  attendanceButton: boolean;
  dDayCount: boolean;
  weddingInfoDate: string;
};

const EventStatus = (props: Props) => {
  return (
    <div className='bg-gray-300 mb-20'>
      {props.dDayCount && <DdayCounter weddingInfoDate={props.weddingInfoDate} />}
      {props.attendanceButton && <AttendanceButton />}
    </div>
  );
};

export default EventStatus;
