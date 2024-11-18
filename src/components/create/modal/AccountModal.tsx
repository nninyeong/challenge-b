'use client';
import { AccountType } from '@/types/accountType.type';
import AccountModalPersonalBox from '../AccountModalPersonalBox';
import { MutableRefObject } from 'react';

const AccountModal = ({
  accounts,
  accountType,
  accountRef,
  setOpenAccountModal,
  setCloseAccountModal,
}: {
  accounts: AccountType[];
  accountType: 'groom' | 'bride';
  accountRef: MutableRefObject<HTMLDivElement | null>;
  setOpenAccountModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCloseAccountModal: () => void;
}) => {
  const { left, width } = accountRef.current!.getBoundingClientRect();
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40'>
      <div
        className='w-[343px] h-[382px] inset-0 rounded-lg bg-white shadow-md 
    z-50 flex flex-col justify-center items-center fixed top-1/2 -translate-x-1/2 -translate-y-1/2 pb-[16px] pl-[16px] pr-[16px] pt-[24px]'
        style={{
          left: left + width / 2,
        }}
      >
        <div className='flex flex-col justify-center'>
          <p className='text-gray-900 font-semibold'>{accountType === 'groom' ? '신랑' : '신부'} 계좌</p>
          <AccountModalPersonalBox
            accountData={accounts[0]}
            setOpenAccountModal={setOpenAccountModal}
          />
        </div>
        <div className='flex flex-col gap-[8px] mb-[16px] mt-[24px]'>
          <p className='text-gray-900 font-semibold text-[16px]'>
            {accountType === 'groom' ? '신랑' : '신부'}혼주 계좌
          </p>
          <AccountModalPersonalBox
            accountData={accounts[1]}
            setOpenAccountModal={setOpenAccountModal}
          />
          <AccountModalPersonalBox
            accountData={accounts[2]}
            setOpenAccountModal={setOpenAccountModal}
          />
        </div>
        <button
          className='w-[311px] h-[48px] text-[16px] bg-primary-300 text-white font-bold rounded-lg'
          onClick={setCloseAccountModal}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default AccountModal;
