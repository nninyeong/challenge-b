import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/ko';
import { Notify } from 'notiflix';
import { useRef } from 'react';

dayjs.extend(localizedFormat);
dayjs.locale('ko');

const DELAY_TIME = 1500;
export const useGetValidatedDay = (date: Date | string) => {
  const notifyTimer = useRef<NodeJS.Timeout | null>(null);
  if (date === '') return;

  const dateObj = new Date(date);
  const day = dayjs(dateObj).format('dddd');
  if (day === 'Invalid Date' && !notifyTimer.current) {
    Notify.failure('알맞은 형태의 날짜를 입력해주세요.');

    notifyTimer.current = setTimeout(() => {
      notifyTimer.current = null;
    }, DELAY_TIME);

    return;
  }

  return day[0];
};
