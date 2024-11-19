import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/ko';
import { Notify } from 'notiflix';
import { useRef } from 'react';

dayjs.extend(localizedFormat);
dayjs.locale('ko');

export const useGetValidatedDay = (date: Date | string) => {
  if (date === '') return;

  const notifyTimer = useRef<NodeJS.Timeout | null>(null);

  const day = dayjs(date).format('dddd');
  if (day === 'Invalid Date' && !notifyTimer.current) {
    Notify.failure('알맞은 형태의 날짜를 입력해주세요.');

    notifyTimer.current = setTimeout(() => {
      notifyTimer.current = null;
    }, 1000);

    return;
  }

  return day[0];
};
