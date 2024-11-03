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

  const convertIndexToAccountLabel = (index: number) => {
    if (index === 0) {
      return accountType === 'groom' ? '신랑' : '신부';
    }

    if (index === 1) return '아버지';
    if (index === 2) return '어머니';
  };
  return (
    <FlexColCenterContainer className='text-sm gap-4 w-full'>
      <div className='flex gap-3 h-[32px] w-full'>
        <label className='self-center w-[50px]'>제목</label>
        <input
          className='px-[8px] w-full rounded-md'
          {...register('account.title')}
          placeholder='신랑 & 신부에게 마음 전하기'
        />
      </div>
      <div className='flex gap-3 h-[32px] w-full'>
        <label className='self-center w-[50px]'>내용</label>
        <input
          className='px-[8px] w-full rounded-md'
          {...register('account.content')}
          placeholder='축복의 의미로 축의금을 전달해보세요.'
        />
      </div>
      <div className='relative w-[267px] h-[31px] bg-gray-100 rounded-full p-1 flex items-center cursor-pointer'>
        <div
          className={`absolute top-0 left-0 w-[49%] h-full bg-[#FF6666] rounded-full transition-transform duration-300 ease-in-out ${
            accountType === 'bride' ? 'translate-x-[103%]' : ''
          }`}
        ></div>
        <button
          type='button'
          onClick={() => setAccountType('groom')}
          className={`z-10 w-[50%] h-[30px] rounded-full transition-colors duration-300 ease-in-out ${
            accountType === 'groom' ? 'text-white' : 'text-[#8c8c8c]'
          } mr-3`}
        >
          신랑측 계좌번호
        </button>
        <button
          type='button'
          onClick={() => setAccountType('bride')}
          className={`z-10 w-[50%] h-[30px] rounded-full transition-colors duration-300 ease-in-out ${
            accountType === 'bride' ? 'text-white' : 'text-[#8c8c8c]'
          }`}
        >
          신부측 계좌번호
        </button>
      </div>

      <div className='w-[311px]'>
        {(accountType === 'groom' ? groomFields : brideFields).map((field, index) => (
          <div
            key={`${accountType}${index}`}
            className='flex justify-center items-center text-[14px] h-[32px] mb-[8px] w-full gap-[19px]'
          >
            <label className='w-[37px] whitespace-nowrap'>{convertIndexToAccountLabel(index)}</label>
            <div className='flex justify-center items-center gap-[8px]'>
              <input
                className='px-[8px] w-[60px] h-[30px] rounded-md'
                {...register(`account.${accountType}[${index}].bank`)}
                placeholder='은행'
              />
              <input
                className='px-[8px] w-[117px] h-[30px] rounded-md'
                {...register(`account.${accountType}[${index}].accountNumber`)}
                placeholder='계좌번호'
              />
              <input
                className='px-[8px] w-[60px] h-[30px] rounded-md'
                {...register(`account.${accountType}[${index}].depositor`)}
                placeholder='예금주'
              />
            </div>
          </div>
        ))}
      </div>
    </FlexColCenterContainer>
  );
};

export default AccountInput;
