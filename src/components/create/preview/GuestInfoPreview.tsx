'use client';

import AttendanceButton from '@/components/attendance/AttendanceButton';
import GuestBook from '@/components/guestbook/GuestBook';
import { Control, useWatch } from 'react-hook-form';
import { InvitationFormType } from '@/types/invitationFormType.type';

const GuestInfoPreview = ({ control }: { control: Control<InvitationFormType> }) => {
  const attendanceButton = useWatch({
    control,
    name: 'attendance',
  });
  const guestBookButton = useWatch({
    control,
    name: 'guestbook',
  });
  const dDayCount = useWatch({
    control,
    name: 'd_day',
  });
  return (
    <>
      {guestBookButton && <GuestBook />}
      {attendanceButton && <AttendanceButton />}
      {dDayCount && <>D-Day</>}
    </>
  );
};

export default GuestInfoPreview;
