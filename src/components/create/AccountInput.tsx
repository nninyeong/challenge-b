'use client';
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

const AccountInput = () => {
  const [accountType, setAccountType] = useState<'groom' | 'bride'>('groom');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [modalValue, setModalValue] = useState('');
  const { register, control, setValue, watch } = useFormContext();

  const { fields: groomFields } = useFieldArray({
    control,
    name: 'account.groom',
  });

  const { fields: brideFields } = useFieldArray({
    control,
    name: 'account.bride',
  });

  // 모달 열기
  const openModal = (index: number) => {
    setSelectedIndex(index);
    setModalValue(''); // 모달 열 때 초기화
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setModalValue('');
    setSelectedIndex(null);
  };

  // 모달의 값 설정 후 닫기
  const handleModalSubmit = () => {
    if (selectedIndex !== null) {
      setValue(`account.${accountType}[${selectedIndex}].kakaopay`, modalValue); // 선택된 인덱스의 kakaoPay 필드에 저장
    }
    closeModal();
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
                  onClick={() => openModal(index)} // 모달 열기
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

      {/* 모달 */}
      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-4 rounded-md'>
            <h2 className='text-lg font-bold mb-4'>카카오페이 정보 입력</h2>
            <input
              type='text'
              value={modalValue}
              onChange={(e) => setModalValue(e.target.value)}
              placeholder='카카오페이 정보 입력'
              className='w-full px-4 py-2 mb-4 border rounded'
            />
            <div className='flex justify-end gap-2'>
              <button onClick={closeModal} className='px-4 py-2 bg-gray-300 rounded'>
                취소
              </button>
              <button onClick={handleModalSubmit} className='px-4 py-2 bg-blue-500 text-white rounded'>
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountInput;
