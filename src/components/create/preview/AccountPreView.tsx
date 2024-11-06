'use client';
import { Control, useWatch } from 'react-hook-form';
import { InvitationFormType } from '@/types/invitationFormType.type';
import Account from '@/components/card/Account';

const AccountPreView = ({ control }: { control: Control<InvitationFormType> }) => {
  const account = useWatch({
    control,
    name: 'account',
  });

  return <Account account={account} />;
};
export default AccountPreView;
