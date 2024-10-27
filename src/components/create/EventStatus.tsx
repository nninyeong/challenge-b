import AttendanceButton from '@/components/attendance/AttendanceButton';
import DdayCounter from '@/components/ddaycounter/DdayCounter';

type Props = {
  attendanceButton: boolean;
  dDayCount: boolean;
  weddingInfoDate: string;
};

const EventStatus = (props: Props) => {
  return (
    <div>
      {props.dDayCount && <DdayCounter weddingInfoDate={props.weddingInfoDate} />}
      {props.attendanceButton && <AttendanceButton />}
    </div>
  );
};

export default EventStatus;
