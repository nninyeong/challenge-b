'use client';

import { InvitationFormType } from '@/types/invitationFormType.type';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import AccountModal from '@/components/create/modal/AccountModal';

type AccountPropType = Pick<InvitationFormType, 'account'>;
const Account = ({ account }: AccountPropType) => {
  const [openAccountModal, setOpenAccountModal] = useState<boolean>(false);
  const [portalElement, setPortalElement] = useState<Element | null>(null);
  const [accountType, setAccountType] = useState<'groom' | 'bride'>('groom');
  const accountData = account[accountType];
  
  useEffect(() => {
    setPortalElement(document.getElementById('modal'));
  }, []);
  
  const handleOpenAccountModal = (type: 'bride' | 'groom') => {
    document.documentElement.style.overflow = 'hidden';
    setOpenAccountModal(true);
    setAccountType(type);
  };

  const handleCloseAccountModal = () => {
    document.documentElement.style.overflow = 'auto';
    setOpenAccountModal(false);
  }
  
  return (
    <div className='flex flex-col justify-center items-center mb-[80px]'>
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
              setCloseAccountModal={handleCloseAccountModal}
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
