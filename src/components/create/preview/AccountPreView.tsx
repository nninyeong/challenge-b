'use client';
import { Control, useWatch } from 'react-hook-form';
import { InvitationFormType } from '@/types/invitationFormType.type';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import AccountModal from '../modal/AccountModal';
import { AccountType } from '@/types/accountType.type';

const AccountPreView = ({ control }: { control: Control<InvitationFormType> }) => {
  const [openAccountModal, setOpenAccountModal] = useState<boolean>(false);
  const [portalElement, setPortalElement] = useState<Element | null>(null);
  const [accountData, setAccountData] = useState<AccountType[]>([]);
  const [accountType, setAccountType] = useState<'groom' | 'bride'>('groom');
  const accountWatch = useWatch({
    control,
    name: 'account',
  });
  useEffect(() => {
    setPortalElement(document.getElementById('modal'));
  }, []);
  const handleOpenAccountModal = (type: 'bride' | 'groom') => {
    setOpenAccountModal(true);
    if (type === 'bride') {
      const brideAccounts = accountWatch.bride;
      setAccountData(brideAccounts);
      setAccountType('bride');
    }
    if (type === 'groom') {
      const groomAccounts = accountWatch.groom;
      setAccountData(groomAccounts);
      setAccountType('groom');
    }
  };
  return (
    <div className='flex flex-col justify-center items-center'>
      <p className='text-xl'>{accountWatch.title ? accountWatch.title : '제목'}</p>
      <p className=''>{accountWatch.content ? accountWatch.content : '내용'}</p>
      <div className='flex flex-col gap-5 mt-5 w-full justify-center items-center'>
        <button
          className='rounded-full border-2 w-[343px] h-[48px]'
          onClick={() => handleOpenAccountModal('groom')}
        >
          신랑 측 계좌번호
        </button>
        <button
          className='rounded-full border-2 w-[343px] h-[48px]'
          onClick={() => handleOpenAccountModal('bride')}
        >
          신부 측 계좌번호
        </button>
      </div>
      {openAccountModal && portalElement
        ? createPortal(
            <AccountModal
              setOpenAccountModal={setOpenAccountModal}
              accounts={accountData}
              accountType={accountType}
            />,
            portalElement,
          )
        : null}
    </div>
  );
};
export default AccountPreView;
