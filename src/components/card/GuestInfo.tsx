'use client';
import { InvitationFormType } from '@/types/invitationFormType.type';
import GuestBook from '@/components/guestbook/GuestBook';
import EventStatus from '@/components/create/EventStatus';

type GuestInfoPropType = Pick<
  InvitationFormType,
  'attendance' | 'guestbook' | 'dDay' | 'weddingInfo' | 'mainPhotoInfo'
>;
const GuestInfo = ({ attendance, guestbook, dDay, weddingInfo, mainPhotoInfo }: GuestInfoPropType) => {
  return (
    <div className='mb-[157px]'>
      {guestbook && <GuestBook />}
      {attendance && dDay && (
        <div className='border border-gray-200 fixed left-1/2 bottom-[16px] w-[343px] h-[67px] bg-white z-50 rounded-[12px] flex justify-between items-center px-[16px] py-[12px] transform -translate-x-1/2'>
          <EventStatus
            attendanceButton={attendance}
            dDayCount={dDay}
            weddingInfoDate={weddingInfo.date}
            leftName={mainPhotoInfo.leftName}
            rightName={mainPhotoInfo.rightName}
            icon={mainPhotoInfo.icon}
          />
        </div>
      )}
    </div>
  );
};

export default GuestInfo;
