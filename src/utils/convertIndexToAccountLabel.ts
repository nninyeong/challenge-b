export const convertIndexToAccountLabel = (index: number, accountType: 'groom' | 'bride') => {
  if (index === 0) {
    return accountType === 'groom' ? '신랑' : '신부';
  }

  if (index === 1) return '아버지';
  if (index === 2) return '어머니';
};
