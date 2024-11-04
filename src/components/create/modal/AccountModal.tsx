import { AccountType } from '@/types/accountType.type';
import AccountModalPersonalBox from '../AccountModalPersonalBox';

const AccountModal = ({
  accounts,
  accountType,
  setOpenAccountModal,
}: {
  accounts: AccountType[];
  accountType: 'groom' | 'bride';
  setOpenAccountModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className='w-[343px] h-[382px] inset-0 rounded-lg bg-white shadow-md 
    z-50 flex flex-col justify-center items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pb-[16px] pl-[16px] pr-[16px] pt-[24px]'
    >
      <div className='flex flex-col justify-center'>
        <p className='text-gray-900 font-semibold'>{accountType === 'groom' ? '신랑' : '신부'} 계좌</p>
        <AccountModalPersonalBox
          accountData={accounts[0]}
          setOpenAccountModal={setOpenAccountModal}
        />
      </div>
      <div className='flex flex-col gap-[8px] mb-[16px] mt-[24px]'>
        <p className='text-gray-900 font-semibold text-[16px]'>{accountType === 'groom' ? '신랑' : '신부'}혼주 계좌</p>
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
        className='w-[311px] h-[48px] bg-primary-300 text-white rounded-lg'
        onClick={() => setOpenAccountModal(false)}
      >
        닫기
      </button>
    </div>
  );
};

export default AccountModal;
