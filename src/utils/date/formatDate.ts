export const formatDate = (value: string) => {
  const inputNumbers = value.replace(/\D/g, '');

  if (inputNumbers.length <= 4) return inputNumbers;
  else if (inputNumbers.length <= 6) return `${inputNumbers.slice(0, 4)}.${inputNumbers.slice(4)}`;
  else return `${inputNumbers.slice(0, 4)}.${inputNumbers.slice(4, 6)}.${inputNumbers.slice(6, 8)}`;
};
