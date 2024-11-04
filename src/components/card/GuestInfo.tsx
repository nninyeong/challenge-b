'use client';
import { InvitationFormType } from '@/types/invitationFormType.type';
import GuestBook from '@/components/guestbook/GuestBook';
import EventStatus from '@/components/create/EventStatus';

type GuestInfoPropType = Pick<InvitationFormType, 'attendance' | 'guestbook' | 'dDay' | 'weddingInfo'>;
const GuestInfo = ({ attendance, guestbook, dDay, weddingInfo }: GuestInfoPropType) => {
  return (
    <>
      {guestbook && <GuestBook />}
      <EventStatus
        attendanceButton={attendance}
        dDayCount={dDay}
        weddingInfoDate={weddingInfo.date}
      />
    </>
  );
};

export default GuestInfo;
