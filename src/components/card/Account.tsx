'use client';

import { InvitationFormType } from '@/types/invitationFormType.type';
import { useEffect, useState } from 'react';
import { AccountType } from '@/types/accountType.type';
import { createPortal } from 'react-dom';
import AccountModal from '@/components/create/modal/AccountModal';

type AccountPropType = Pick<InvitationFormType, 'account'>;
const Account = ({ account }: AccountPropType) => {
  const [openAccountModal, setOpenAccountModal] = useState<boolean>(false);
  const [portalElement, setPortalElement] = useState<Element | null>(null);
  const [accountData, setAccountData] = useState<AccountType[]>([]);
  const [accountType, setAccountType] = useState<'groom' | 'bride'>('groom');
  useEffect(() => {
    setPortalElement(document.getElementById('modal'));
  }, []);
  const handleOpenAccountModal = (type: 'bride' | 'groom') => {
    setOpenAccountModal(true);
    if (type === 'bride') {
      const brideAccounts = account.bride;
      setAccountData(brideAccounts);
      setAccountType('bride');
    }
    if (type === 'groom') {
      const groomAccounts = account.groom;
      setAccountData(groomAccounts);
      setAccountType('groom');
    }
  };
  return (
    <div className='flex flex-col justify-center items-center'>
      <p className='text-xl'>{account.title ? account.title : '제목'}</p>
      <p className=''>{account.content ? account.content : '내용'}</p>
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

export default Account;
