'use client';
import useKakaoPayModal from '@/hooks/kakaopay/useKakaoPayModal';
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import KakaoPayModal from './modal/KakaoPayModal';
import { kakaopaySchema } from '@/lib/zod/kakaoPaySchema';
import { z } from 'zod';
import { Notify } from 'notiflix';

const AccountInput = () => {
  const [accountType, setAccountType] = useState<'groom' | 'bride'>('groom');
  const { register, control, setValue, watch } = useFormContext();

  const { fields: groomFields } = useFieldArray({
    control,
    name: 'account.groom',
  });

  const { fields: brideFields } = useFieldArray({
    control,
    name: 'account.bride',
  });

  const {
    isModalOpen,
    modalValue,
    selectedIndex,
    setModalValue,
    openModal,
    closeModal,
  } = useKakaoPayModal();

  const handleModalSubmit = () => {
    try {
      kakaopaySchema.parse(modalValue);
      if (selectedIndex !== null) {
        setValue(`account.${accountType}[${selectedIndex}].kakaopay`, modalValue);
        closeModal();
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        Notify.failure(error.errors[0].message);
      }
    }
  };

  return (
    <div className='flex-col-center text-sm gap-4 w-full'>
      <div className='flex gap-3 h-[32px] w-full'>
        <label className='self-center w-[50px]'>제목</label>
        <input
          className='px-[8px] w-full rounded-md'
          {...register('account.title')}
          placeholder='신랑 & 신부에게 마음 전하기'
          maxLength={20}
        />
      </div>
      <div className='flex gap-3 h-[32px] w-full'>
        <label className='self-center w-[50px]'>내용</label>
        <input
          className='px-[8px] w-full rounded-md'
          {...register('account.content')}
          placeholder='축복의 의미로 축의금을 전달해보세요.'
          maxLength={20}
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
        {(accountType === 'groom' ? groomFields : brideFields).map((field, index) => {
          const kakaopayValue = watch(`account.${accountType}[${index}].kakaopay`);

          return (
            <div
              key={`${accountType}${index}`}
              className='flex justify-center items-center text-[14px] h-[32px] mb-[8px] w-full gap-[19px]'
            >
              <div className='flex justify-center items-center gap-[8px]'>
                <input
                  className='px-[8px] w-[60px] h-[30px] rounded-md'
                  {...register(`account.${accountType}[${index}].depositor`)}
                  placeholder='예금주'
                  maxLength={5}
                />
                <input
                  className='px-[8px] w-[60px] h-[30px] rounded-md'
                  {...register(`account.${accountType}[${index}].bank`)}
                  placeholder='은행'
                  maxLength={9}
                />
                <input
                  className='px-[8px] w-[117px] h-[30px] rounded-md'
                  {...register(`account.${accountType}[${index}].accountNumber`)}
                  placeholder='계좌번호'
                  maxLength={27}
                />
                <button
                  type='button'
                  onClick={() => openModal(index, kakaopayValue)} // 모달 열기
                >
                  <img
                    src={
                      kakaopayValue
                        ? '/assets/images/icons/kakaomodal-on.svg'
                        : '/assets/images/icons/kakaomodal-off.svg'
                    }
                    alt={kakaopayValue ? '카카오페이 활성화' : '카카오페이 비활성화'}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <KakaoPayModal
        isModalOpen={isModalOpen}
        value={modalValue}
        onClose={closeModal}
        onSave={handleModalSubmit}
        onChange={setModalValue}
      />
    </div>
  );
};

export default AccountInput;
