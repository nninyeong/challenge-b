'use client';
import { Control, useWatch } from 'react-hook-form';
import { InvitationFormType } from '@/types/invitationFormType.type';

const AccountPreView = ({ control }: { control: Control<InvitationFormType> }) => {
  const accountWatch = useWatch({
    control,
    name: 'account',
  });

  return (
    <div className='flex flex-col justify-center items-center'>
      <p className='text-xl'>{accountWatch.title ? accountWatch.title : '제목'}</p>
      <p className=''>{accountWatch.content ? accountWatch.content : '내용'}</p>
      <div className='flex flex-col gap-5 mt-5 w-1/2'>
        <button className='rounded-full border-2 w-full'>신랑 측 계좌번호</button>
        <button className='rounded-full border-2 w-full'>신부 측 계좌번호</button>
      </div>
    </div>
  );
};
export default AccountPreView;
