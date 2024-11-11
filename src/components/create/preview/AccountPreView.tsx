'use client';
import { Control, useWatch } from 'react-hook-form';
import { InvitationFormType } from '@/types/invitationFormType.type';
import Account from '@/components/card/Account';

const AccountPreView = ({ control }: { control: Control<InvitationFormType> }) => {
  const [account, fontInfo] = useWatch({
    control,
    name: ['account', 'fontInfo'],
  });

  return (
    <Account
      account={account}
      fontInfo={fontInfo}
    />
  );
};
export default AccountPreView;
