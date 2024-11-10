'use client';
import { AccountType } from '@/types/accountType.type';
import { Notify } from 'notiflix';

const AccountModalPersonalBox = ({
  accountData,
  setOpenAccountModal,
}: {
  accountData: AccountType;
  setOpenAccountModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleCopyAccountNumber = async () => {
    try {
      await navigator.clipboard.writeText(`${accountData.bank} ${accountData.accountNumber}`);
      setOpenAccountModal(false);
      if (accountData.bank === '') return Notify.failure('은행을 입력해주세요.');
      if (accountData.accountNumber === '') return Notify.failure('계좌번호를 입력해주세요.');
      Notify.success('복사되었습니다.');
    } catch (error) {
      console.error(error);
    }
  };
  const handleOpenKakaoPay = () => {
    window.open(accountData.kakaopay, '_blank');
  };
  return (
    <div className='pl-[16px] pr-[12px] w-[312px] h-[64px] bg-gray-50 rounded-lg flex justify-between'>
      <div className='flex flex-col justify-center'>
        <p className='text-[14px] text-gray-700 font-medium'>
          {`${accountData.bank} (예금주 : ${accountData.depositor} )`}
        </p>
        <p className='text-[14px] text-gray-500'>{accountData.accountNumber}</p>
      </div>
      <div className='self-end flex gap-1'>
        {accountData.kakaopay && (
          <button onClick={handleOpenKakaoPay} className='mb-[12px]'>
            <img
              src={'/assets/images/icons/kakaopay-button.svg'}
              alt={'카카오페이 버튼'}
            />
          </button>
        )}
        <button
          className='bg-primary-300 text-white text-[14px] rounded-full w-[73px] h-[25px] mb-[12px]'
          onClick={handleCopyAccountNumber}
        >
          복사하기
        </button>
      </div>
    </div>
  );
};

export default AccountModalPersonalBox;
