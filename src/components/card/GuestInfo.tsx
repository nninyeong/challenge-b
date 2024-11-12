'use client';
import { InvitationFormType } from '@/types/invitationFormType.type';
import { AttendanceProvider } from '@/context/AttendanceContext';
import GuestBook from '@/components/guestbook/GuestBook';
import PreviewEventStatus from '@/components/create/PreviewEventStatus';
import PreviewShowAttendanceModal from '../attendance/PreviewShowAttendanceModal';

type GuestInfoPropType = Pick<
  InvitationFormType,
  'attendance' | 'guestbook' | 'dDay' | 'weddingInfo' | 'mainPhotoInfo' | 'fontInfo'
>;
const GuestInfo = ({ attendance, guestbook, dDay, weddingInfo, mainPhotoInfo, fontInfo }: GuestInfoPropType) => {
  return (
    <AttendanceProvider>
      <div className='mb-[157px]'>
        {guestbook && <GuestBook fontInfo={fontInfo} />}
        {attendance && dDay && (
          <div className='border border-gray-200 fixed left-1/2 bottom-[16px] w-[343px] h-[67px] bg-white z-30 rounded-[12px] flex justify-between items-center px-[16px] py-[12px] transform -translate-x-1/2'>
            <PreviewEventStatus
              attendanceButton={attendance}
              dDayCount={dDay}
              weddingInfoDate={weddingInfo.date}
              leftName={mainPhotoInfo.leftName}
              rightName={mainPhotoInfo.rightName}
              icon={mainPhotoInfo.icon}
            />
          </div>
        )}
        <PreviewShowAttendanceModal />
      </div>
    </AttendanceProvider>
  );
};

export default GuestInfo;
