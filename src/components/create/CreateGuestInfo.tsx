'use client';
import { InvitationFormType } from '@/types/invitationFormType.type';
import GuestBook from '@/components/guestbook/GuestBook';
import EventStatus from '@/components/create/EventStatus';
type GuestInfoPropType = Pick<
  InvitationFormType,
  'attendance' | 'guestbook' | 'dDay' | 'weddingInfo' | 'mainPhotoInfo' | 'fontInfo'
>;

const GuestInfo = ({ attendance, guestbook, dDay, weddingInfo, mainPhotoInfo, fontInfo }: GuestInfoPropType) => {
  return (
    <>
      {guestbook && <GuestBook fontInfo={fontInfo} />}
      {attendance && dDay && (
        <div className='ml-4 border border-gray-200 left-1/2 bottom-[16px] w-[343px] h-[67px] bg-white rounded-[12px] flex justify-between items-center px-[16px] py-[12px]'>
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
    </>
  );
};

export default GuestInfo;
