'use client';
import { InvitationFormType } from '@/types/invitationFormType.type';
import GuestBook from '@/components/guestbook/GuestBook';
import EventStatus from '@/components/create/EventStatus';

type GuestInfoPropType = Pick<InvitationFormType, 'attendance' | 'guestbook' | 'dDay' | 'weddingInfo' | 'mainPhotoInfo'>;
const GuestInfo = ({ attendance, guestbook, dDay, weddingInfo, mainPhotoInfo }: GuestInfoPropType) => {
  return (
    <>
      {guestbook && <GuestBook />}
      <EventStatus
        attendanceButton={attendance}
        dDayCount={dDay}
        weddingInfoDate={weddingInfo.date}
        leftName={mainPhotoInfo.leftName}
        rightName={mainPhotoInfo.rightName}
        icon={mainPhotoInfo.icon}
      />
    </>
  );
};

export default GuestInfo;
