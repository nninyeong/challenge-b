'use client';
import { InvitationFormType } from '@/types/invitationFormType.type';
import { Control, useFormContext } from 'react-hook-form';

type Props = {
  control: Control<InvitationFormType>;
  type: 'groom' | 'bride';
};
export const RenderPersonalInfo = ({ type }: Props) => {
  const { register } = useFormContext();

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center gap-1 text-[14px] font-medium'>
        <label className='w-[50px]'>{type === 'groom' ? '신랑' : '신부'}</label>
        <input
          type='text'
          placeholder='이름'
          {...register(`personalInfo.${type}.name`)}
          className='h-[32px] w-[72px] pl-[8px] py-[9px] border text-[12px] rounded-[8px]'
        />
        <p className='flex items-center h-[32px] w-[48px] border text-[12px] rounded-[8px] bg-white pl-[5px]'>
          {type === 'groom' ? '아들' : '딸'}
        </p>
        <input
          type='text'
          placeholder='- 없이 입력'
          {...register(`personalInfo.${type}.phoneNumber`)}
          className='h-[32px] w-[92px] pl-[8px] py-[9px] border text-[12px] rounded-[8px]'
        />
      </div>

      <div className='flex items-center gap-1 text-[14px] font-medium'>
        <label className='w-[50px]'>아버지</label>
        <input
          type='text'
          placeholder='성함'
          {...register(`personalInfo.${type}.father.name`)}
          className='h-[32px] w-[72px] pl-[8px] py-[9px] border text-[12px] rounded-[8px]'
        />
        <p className='flex items-center h-[32px] w-[48px] border text-[12px] rounded-[8px] bg-white pl-[5px]'>아버지</p>
        <input
          type='text'
          placeholder='01012345678'
          {...register(`personalInfo.${type}.father.phoneNumber`)}
          className='h-[32px] w-[92px] pl-[8px] py-[9px] border text-[12px] rounded-[8px]'
        />
        <input
          type='checkbox'
          {...register(`personalInfo.${type}.father.isDeceased`)}
        />
        <label>故</label>
      </div>

      <div className='flex items-center gap-1 text-[14px] font-medium'>
        <label className='w-[50px]'>어머니</label>
        <input
          type='text'
          placeholder='성함'
          {...register(`personalInfo.${type}.mother.name`)}
          className='h-[32px] w-[72px] pl-[8px] py-[9px] border text-[12px] rounded-[8px]'
        />
        <p className='flex items-center h-[32px] w-[48px] border text-[12px] rounded-[8px] bg-white pl-[5px]'>어머니</p>
        <input
          type='text'
          placeholder='01012345678'
          {...register(`personalInfo.${type}.mother.phoneNumber`)}
          className='h-[32px] w-[92px] pl-[8px] py-[9px] border text-[12px] rounded-[8px]'
        />
        <input
          type='checkbox'
          {...register(`personalInfo.${type}.mother.isDeceased`)}
        />
        <label>故</label>
      </div>
    </div>
  );
};

export default RenderPersonalInfo;
