import { Notify } from 'notiflix';
import { isValid, parse } from 'date-fns';

export const formatDate = (value: string) => {
  const inputNumbers = value.replace(/\D/g, '');

  if (inputNumbers.length <= 4) return inputNumbers;
  else if (inputNumbers.length <= 6) return `${inputNumbers.slice(0, 4)}.${inputNumbers.slice(4)}`;

  const formattedDate = `${inputNumbers.slice(0, 4)}-${inputNumbers.slice(4, 6)}-${inputNumbers.slice(6, 8)}`;
  const parsedDate = parse(formattedDate, 'yyyy-MM-dd', new Date());

  if (!isValid(parsedDate)) {
    Notify.failure('유효한 날짜를 입력해주세요.');
  }

  return formattedDate;
};
