'use client';

import { InvitationFormType } from '@/types/invitationFormType.type';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import AccountModal from '@/components/create/modal/AccountModal';

type AccountPropType = Pick<InvitationFormType, 'account' | 'fontInfo'>;
const Account = ({ account, fontInfo }: AccountPropType) => {
  const [openAccountModal, setOpenAccountModal] = useState<boolean>(false);
  const [portalElement, setPortalElement] = useState<Element | null>(null);
  const [accountType, setAccountType] = useState<'groom' | 'bride'>('groom');
  const accountData = account[accountType];

  useEffect(() => {
    setPortalElement(document.getElementById('modal'));
  }, []);

  const handleOpenAccountModal = (type: 'bride' | 'groom') => {
    setOpenAccountModal(true);
    setAccountType(type);
  };

  const { size, color } = fontInfo;
  const rgbaColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;

  return (
    <div
      style={{ color: `${rgbaColor}` }}
      className='flex flex-col justify-center items-center mb-[80px]'
    >
      <p style={{ fontSize: ` ${20 + size}px)` }}>{account.title ? account.title : '제목'}</p>
      <p>{account.content ? account.content : '내용'}</p>
      <div
        className='flex flex-col gap-5 mt-5 w-full justify-center items-center'
        style={{ fontSize: `${16 + size}px` }}
      >
        <button
          style={{ border: `2px solid ${rgbaColor}` }}
          className='rounded-full  w-[343px] h-[48px] '
          onClick={() => handleOpenAccountModal('groom')}
        >
          신랑 측 계좌번호
        </button>
        <button
          style={{ border: `2px solid ${rgbaColor}` }}
          className='rounded-full w-[343px] h-[48px] '
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
