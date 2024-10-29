'use client';
import { useState } from 'react';
import RenderPersonalInfo from './preview/RenderPersonalInfo';
import { Control } from 'react-hook-form';
import { InvitationFormType } from '@/types/invitationFormType.type';

const PersonalInfoInput = ({ control }: { control: Control<InvitationFormType> }) => {
  const [personalInfoType, setPersonalInfoType] = useState<'groom' | 'bride'>('groom');

  return (
    <div className='flex flex-col gap-5 items-center justify-center w-full mt-2'>
      <div className='flex justify-center items-center gap-3'>
        <button
          type='button'
          onClick={() => setPersonalInfoType('groom')}
          className={`${personalInfoType === 'groom' ? 'bg-[#FF6666] text-white' : 'text-[#8c8c8c]'} rounded-full w-[130px] h-[30px]`}
        >
          신랑측 정보
        </button>
        <button
          type='button'
          onClick={() => setPersonalInfoType('bride')}
          className={`${personalInfoType === 'bride' ? 'bg-[#FF6666] text-white' : 'text-[#8c8c8c]'} rounded-full w-[130px] h-[30px]`}
        >
          신부측 정보
        </button>
      </div>
      <RenderPersonalInfo
        control={control}
        type={personalInfoType}
      />
    </div>
  );
};

export default PersonalInfoInput;
