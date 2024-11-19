'use client';
import useKakaoPayModal from '@/hooks/kakaopay/useKakaoPayModal';
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import KakaoPayModal from './modal/KakaoPayModal';
import { Notify } from 'notiflix';

const AccountInput = () => {
  const [accountType, setAccountType] = useState<'groom' | 'bride'>('groom');
  const { register, control, watch } = useFormContext();

  const { fields: groomFields } = useFieldArray({
    control,
    name: 'account.groom',
  });

  const { fields: brideFields } = useFieldArray({
    control,
    name: 'account.bride',
  });

  const { isModalOpen, modalValue, selectedIndex, isInvalid, setModalValue, openKakaoPayModal, closeKakaoPayModal } =
    useKakaoPayModal();

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalValue !== '' && !modalValue.startsWith('https://qr.kakaopay.com')) {
      Notify.failure('카카오페이 링크 형식에 맞지 않습니다');
      return;
    }
    closeKakaoPayModal();
  };

  return (
    <div className='flex-col-center text-sm gap-4 w-full text-gray-900 text-[12px]'>
      <div className='flex gap-3 h-[32px] w-full'>
        <label className='self-center w-[50px] text-gray-700 text-[14px] font-medium'>제목</label>
        <input
          className='px-[8px] w-full rounded-[8px] border-[.5px] border-gray-300'
          {...register('account.title')}
          placeholder='신랑 & 신부에게 마음 전하기'
          maxLength={20}
        />
      </div>
      <div className='flex gap-3 h-[32px] w-full'>
        <label className='self-center w-[50px] text-gray-700 text-[14px] font-medium'>내용</label>
        <input
          className='px-[8px] w-full rounded-[8px] border-[.5px] border-gray-300'
          {...register('account.content')}
          placeholder='축복의 의미로 축의금을 전달해보세요.'
          maxLength={20}
        />
      </div>
      <div className='relative w-[267px] h-[31px] bg-gray-100 rounded-full p-1 flex items-center cursor-pointer'>
        <div
          className={`absolute top-0 left-0 w-[49%] h-full bg-[#FF6666] shadow-[1px_1px_5px_rgba(255,102,102,0.4)] rounded-full transition-transform duration-300 ease-in-out ${
            accountType === 'bride' ? 'translate-x-[103%]' : ''
          }`}
        ></div>
        <button
          type='button'
          onClick={() => setAccountType('groom')}
          className={`z-10 w-[50%] h-[30px] rounded-full transition-colors duration-300 ease-in-out ${
            accountType === 'groom' ? 'text-white font-bold' : 'text-[#8c8c8c]'
          } mr-3`}
        >
          신랑측 계좌번호
        </button>
        <button
          type='button'
          onClick={() => setAccountType('bride')}
          className={`z-10 w-[50%] h-[30px] rounded-full transition-colors duration-300 ease-in-out ${
            accountType === 'bride' ? 'text-white font-bold' : 'text-[#8c8c8c]'
          }`}
        >
          신부측 계좌번호
        </button>
      </div>

      <div className='w-[311px] desktop:w-full desktop:px-[80px]'>
        {(accountType === 'groom' ? groomFields : brideFields).map((field, index) => {
          const kakaopayValue = watch(`account.${accountType}[${index}].kakaopay`);

          return (
            <div
              key={`${accountType}${index}`}
              className='flex justify-center items-center text-[14px] h-[32px] mb-[8px] w-full gap-[19px] desktop:w-full'
            >
              <div className='flex justify-center items-center gap-[8px] desktop:w-full'>
                <input
                  className='px-[8px] w-[60px] h-[30px] rounded-[8px] border-[.5px] border-gray-300 desktop:basis-1/6'
                  {...register(`account.${accountType}[${index}].depositor`)}
                  placeholder='예금주'
                  maxLength={5}
                />
                <input
                  className='px-[8px] w-[60px] h-[30px] rounded-[8px] border-[.5px] border-gray-300 desktop:basis-1/6'
                  {...register(`account.${accountType}[${index}].bank`)}
                  placeholder='은행'
                  maxLength={9}
                />
                <input
                  className='px-[8px] w-[117px] h-[30px] rounded-[8px] border-[.5px] border-gray-300 desktop:basis-3/6'
                  {...register(`account.${accountType}[${index}].accountNumber`)}
                  placeholder='계좌번호'
                  maxLength={27}
                />
                <button
                  type='button'
                  onClick={() => openKakaoPayModal(index, kakaopayValue)}
                  className='w-[48px] h-[32px]'
                >
                  <img
                    className='w-full h-full'
                    src={
                      kakaopayValue
                        ? '/assets/images/icons/kakaomodal-on.webp'
                        : '/assets/images/icons/kakaomodal-off.webp'
                    }
                    loading='lazy'
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
        onClose={closeKakaoPayModal}
        onSave={onSave}
      >
        <input
          {...register(`account.${accountType}[${selectedIndex}].kakaopay`)}
          value={modalValue}
          onChange={(e) => setModalValue(e.target.value)}
          placeholder='카카오페이 송금 링크 복사'
          className={`w-full px-4 py-2 border rounded mb-4 ${isInvalid ? 'border-red-500' : ''}`}
        />
      </KakaoPayModal>
    </div>
  );
};

export default AccountInput;
