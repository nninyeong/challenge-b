import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/ko';

dayjs.extend(localizedFormat);
dayjs.locale('ko');

export const getDayOfWeek = (date: string) => {
  if (date === '') return;

  const dateObj = new Date(date.replace(/\./g, '-'));
  const day = dayjs(dateObj).format('dddd');

  return day[0];
};
