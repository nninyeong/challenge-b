'use client';
import { useFormContext } from 'react-hook-form';

const PersonalInfoInput = () => {
  const { register } = useFormContext();

  return (
    <div className='flex flex-col gap-5 items-center justify-center w-full mt-2'>
      <div className='flex flex-col gap-3'>
        <div className='flex items-center gap-1 text-[14px] font-medium'>
          <label className='w-[50px]'>신랑</label>
          <input
            type='text'
            placeholder='이름'
            {...register('personal_info.groom.name')}
            className='h-[32px] w-[72px] pl-[8px] py-[9px] border text-[12px] rounded-[8px]'
          />
          <p className='flex items-center h-[32px] w-[48px] border text-[12px] rounded-[8px] bg-white pl-[5px]'>아들</p>
          <input
            type='text'
            placeholder='- 없이 입력'
            {...register('personal_info.groom.phonNumber')}
            className='h-[32px] w-[92px] pl-[8px] py-[9px] border text-[12px] rounded-[8px]'
          />
        </div>

        <div className='flex items-center gap-1 text-[14px] font-medium'>
          <label className='w-[50px]'>아버지</label>
          <input
            type='text'
            placeholder='성함'
            {...register('personal_info.groom.fatherName')}
            className='h-[32px] w-[72px] pl-[8px] py-[9px] border text-[12px] rounded-[8px]'
          />
          <p className='flex items-center h-[32px] w-[48px] border text-[12px] rounded-[8px] bg-white pl-[5px]'>
            아버지
          </p>
          <input
            type='text'
            placeholder='01012345678'
            {...register('personal_info.groom.fatherPhoneNumber')}
            className='h-[32px] w-[92px] pl-[8px] py-[9px] border text-[12px] rounded-[8px]'
          />
          <input
            type='checkbox'
            {...register('personal_info.groom.isFatherDeceased')}
          />
          <label>故</label>
        </div>

        <div className='flex items-center gap-1 text-[14px] font-medium'>
          <label className='w-[50px]'>어머니</label>
          <input
            type='text'
            placeholder='성함'
            {...register('personal_info.groom.motherName')}
            className='h-[32px] w-[72px] pl-[8px] py-[9px] border text-[12px] rounded-[8px]'
          />
          <p className='flex items-center h-[32px] w-[48px] border text-[12px] rounded-[8px] bg-white pl-[5px]'>
            어머니
          </p>
          <input
            type='text'
            placeholder='01012345678'
            {...register('personal_info.groom.motherPhoneNumber')}
            className='h-[32px] w-[92px] pl-[8px] py-[9px] border text-[12px] rounded-[8px]'
          />
          <input
            type='checkbox'
            {...register('personal_info.groom.isMotherDeceased')}
          />
          <label>故</label>
        </div>
      </div>

      <div className='flex flex-col gap-3'>
        <div className='flex items-center gap-1 text-[14px] font-medium'>
          <label className='w-[50px]'>신부</label>
          <input
            type='text'
            placeholder='이름'
            {...register('personal_info.bride.name')}
            className='h-[32px] w-[72px] pl-[8px] py-[9px] border text-[12px] rounded-[8px]'
          />
          <p className='flex items-center h-[32px] w-[48px] border text-[12px] rounded-[8px] bg-white pl-[5px]'>딸</p>
          <input
            type='text'
            placeholder='01012345678'
            {...register('personal_info.bride.phoneNumber')}
            className='h-[32px] w-[92px] pl-[8px] py-[9px] border text-[12px] rounded-[8px]'
          />
        </div>

        <div className='flex items-center gap-1 text-[14px] font-medium'>
          <label className='w-[50px]'>아버지</label>
          <input
            type='text'
            placeholder='성함'
            {...register('personal_info.bride.fatherName')}
            className='h-[32px] w-[72px] pl-[8px] py-[9px] border text-[12px] rounded-[8px]'
          />
          <p className='flex items-center h-[32px] w-[48px] border text-[12px] rounded-[8px] bg-white pl-[5px]'>
            아버지
          </p>
          <input
            type='text'
            placeholder='01012345678'
            {...register('personal_info.bride.fatherPhoneNumber')}
            className='h-[32px] w-[92px] pl-[8px] py-[9px] border text-[12px] rounded-[8px]'
          />
          <input
            type='checkbox'
            {...register('personal_info.bride.isFatherDeceased')}
          />
          <label>故</label>
        </div>

        <div className='flex items-center gap-1 text-[14px] font-medium'>
          <label className='w-[50px]'>어머니</label>
          <input
            type='text'
            placeholder='성함'
            {...register('personal_info.bride.motherName')}
            className='h-[32px] w-[72px] pl-[8px] py-[9px] border text-[12px] rounded-[8px]'
          />
          <p className='flex items-center h-[32px] w-[48px] border text-[12px] rounded-[8px] bg-white pl-[5px]'>
            어머니
          </p>
          <input
            type='text'
            placeholder='01012345678'
            {...register('personal_info.bride.motherPhoneNumber')}
            className='h-[32px] w-[92px] pl-[8px] py-[9px] border text-[12px] rounded-[8px]'
          />
          <input
            type='checkbox'
            {...register('personal_info.bride.isMotherDeceased')}
          />
          <label>故</label>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoInput;
