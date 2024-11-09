export type AccountType = {
  bank: string;
  accountNumber: string;
  depositor: string;
  kakaopay: string;
};
export type AccountInfoType = {
  title: string;
  content: string;
  bride: AccountType[];
  groom: AccountType[];
};
