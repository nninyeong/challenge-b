'use client';
import { InvitationFormType } from '@/types/invitationFormType.type';
import GuestBook from '@/components/guestbook/GuestBook';
import EventStatus from '@/components/create/EventStatus';
import { useFontStore, useFontColorStore } from '@/store/useFontStore';
type GuestInfoPropType = Pick<
  InvitationFormType,
  'attendance' | 'guestbook' | 'dDay' | 'weddingInfo' | 'mainPhotoInfo'
>;

const GuestInfo = ({ attendance, guestbook, dDay, weddingInfo, mainPhotoInfo }: GuestInfoPropType) => {
  const fontSize = useFontStore((state) => state.fontSize);
  const fontColor = useFontColorStore((state) => state.fontColor);
  const rgbaColor = `rgba(${fontColor.r}, ${fontColor.g}, ${fontColor.b}, ${fontColor.a})`;
  return (
    <>
      {guestbook && (
        <GuestBook
          fontSize={fontSize}
          fontColor={rgbaColor}
        />
      )}
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
