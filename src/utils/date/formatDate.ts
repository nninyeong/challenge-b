import dayjs from 'dayjs';
import { Notify } from 'notiflix';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);
dayjs.locale('ko');

export const formatDate = (value: string) => {
  const inputNumbers = value.replace(/\D/g, '');

  if (inputNumbers.length <= 4) return inputNumbers;
  else if (inputNumbers.length <= 6) return `${inputNumbers.slice(0, 4)}.${inputNumbers.slice(4)}`;
  else {
    const formattedDate = `${inputNumbers.slice(0, 4)}.${inputNumbers.slice(4, 6)}.${inputNumbers.slice(6, 8)}`;
    const isValide = dayjs(formattedDate, 'YYYY.MM.DD').isValid();
    if (!isValide) {
      Notify.failure('유효한 날짜를 입력해주세요.');
      return '';
    }

    return formattedDate;
  }
};
