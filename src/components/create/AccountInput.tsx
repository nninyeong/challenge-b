'use client';
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import FlexColCenterContainer from '../FlexColCenterContainer';

const AccountInput = () => {
  const [accountType, setAccountType] = useState<'groom' | 'bride'>('groom');
  const { register, control } = useFormContext();

  const { fields: groomFields } = useFieldArray({
    control,
    name: 'account.groom',
  });

  const { fields: brideFields } = useFieldArray({
    control,
    name: 'account.bride',
  });

  return (
    <FlexColCenterContainer className='text-sm gap-4 w-full'>
      <div className='flex gap-3 h-[32px] w-full'>
        <label className='self-center w-[50px]'>제목</label>
        <input
          className='px-1 w-full rounded-md'
          {...register('account.title')}
          placeholder='신랑 & 신부에게 마음 전하기'
        />
      </div>
      <div className='flex gap-3 h-[32px] w-full'>
        <label className='self-center w-[50px]'>내용</label>
        <input
          className='px-1 w-full rounded-md'
          {...register('account.content')}
          placeholder='축복의 의미로 축의금을 전달해보세요.'
        />
      </div>

      <div className='flex justify-center items-center gap-3'>
        <button
          type='button'
          onClick={() => setAccountType('groom')}
          className={`${accountType === 'groom' ? 'bg-[#FF6666] text-white' : 'text-[#8c8c8c]'} rounded-full w-[130px] h-[30px]`}
        >
          신랑측 계좌번호
        </button>
        <button
          type='button'
          onClick={() => setAccountType('bride')}
          className={`${accountType === 'bride' ? 'bg-[#FF6666] text-white' : 'text-[#8c8c8c]'} rounded-full w-[130px] h-[30px]`}
        >
          신부측 계좌번호
        </button>
      </div>

      <div className='w-full'>
        {(accountType === 'groom' ? groomFields : brideFields).map((field, index) => (
          <div
            key={`${accountType}${index}`}
            className='flex justify-center items-center text-md gap-3 h-[32px] mb-[8px]'
          >
            <label>
              {accountType === 'groom' ? '신랑' : '신부'}측 {index + 1}
            </label>
            <input
              className='px-1 w-[60px] h-[30px] rounded-md'
              {...register(`account.${accountType}[${index}].bank`)}
              placeholder='은행'
            />
            <input
              className='px-1 w-[120px] h-[30px] rounded-md'
              {...register(`account.${accountType}[${index}].accountNumber`)}
              placeholder='계좌번호'
            />
            <input
              className='px-1 w-[60px] h-[30px] rounded-md'
              {...register(`account.${accountType}[${index}].depositer`)}
              placeholder='예금주'
            />
          </div>
        ))}
      </div>
    </FlexColCenterContainer>
  );
};

export default AccountInput;
