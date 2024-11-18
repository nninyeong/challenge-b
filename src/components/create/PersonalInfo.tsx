'use client';
import { useFormContext } from 'react-hook-form';

type Props = {
  type: 'groom' | 'bride';
};

export const PersonalInfo = ({ type }: Props) => {
  const { register } = useFormContext();

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center gap-1 text-[14px] font-medium'>
        <input
          type='text'
          placeholder={type === 'groom' ? '신랑' : '신부'}
          {...register(`personalInfo.${type}.relation`)}
          className='h-[32px] w-[72px] desktop:w-[81px] pl-[8px] py-[9px] border text-[12px] rounded-[8px]'
          maxLength={5}
        />
        <input
          type='text'
          placeholder='이름'
          {...register(`personalInfo.${type}.name`)}
          className='h-[32px] w-[72px] desktop:w-[112px] pl-[8px] py-[9px] border text-[12px] rounded-[8px]'
          maxLength={5}
        />
        <input
          type='text'
          placeholder='- 없이 입력'
          {...register(`personalInfo.${type}.phoneNumber`)}
          className='h-[32px] w-[151px] desktop:w-[259px] pl-[8px] py-[9px] border text-[12px] rounded-[8px]'
          maxLength={15}
        />
      </div>

      <div>
        <div className='flex items-center gap-1 text-[14px] font-medium'>
          <input
            type='text'
            placeholder='아버지'
            {...register(`personalInfo.${type}.father.relation`)}
            className='h-[32px] w-[72px] desktop:w-[81px] pl-[8px] py-[9px] border text-[12px] rounded-[8px]'
            maxLength={5}
          />
          <input
            type='text'
            placeholder='성함'
            {...register(`personalInfo.${type}.father.name`)}
            className='h-[32px] w-[72px] desktop:w-[112px] pl-[8px] py-[9px] border text-[12px] rounded-[8px]'
            maxLength={5}
          />
          <input
            type='text'
            placeholder='01012345678'
            {...register(`personalInfo.${type}.father.phoneNumber`)}
            className='h-[32px] w-[151px] desktop:w-[259px] pl-[8px] py-[9px] border text-[12px] rounded-[8px]'
            maxLength={15}
          />
        </div>

        <div className='flex justify-end items-center gap-[6px] mt-[8px]'>
          <input
            type='checkbox'
            {...register(`personalInfo.${type}.father.isDeceased`)}
            className='custom-checkbox'
          />
          <label>故</label>
        </div>
      </div>
      <div>
        <div className='flex items-center gap-1 text-[14px] font-medium'>
          <input
            type='text'
            placeholder='어머니'
            {...register(`personalInfo.${type}.mother.relation`)}
            className='h-[32px] w-[72px] desktop:w-[81px] pl-[8px] py-[9px] border text-[12px] rounded-[8px]'
            maxLength={5}
          />
          <input
            type='text'
            placeholder='성함'
            {...register(`personalInfo.${type}.mother.name`)}
            className='h-[32px] w-[72px] desktop:w-[112px] pl-[8px] py-[9px] border text-[12px] rounded-[8px]'
            maxLength={5}
          />
          <input
            type='text'
            placeholder='01012345678'
            {...register(`personalInfo.${type}.mother.phoneNumber`)}
            className='h-[32px] w-[151px] desktop:w-[259px] pl-[8px] py-[9px] border text-[12px] rounded-[8px]'
            maxLength={15}
          />
        </div>

        <div className='flex justify-end items-center gap-[6px] mt-[6px]'>
          <input
            type='checkbox'
            {...register(`personalInfo.${type}.mother.isDeceased`)}
            className='custom-checkbox'
          />
          <label>故</label>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
