import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/ko';

dayjs.extend(localizedFormat);
dayjs.locale('ko');

export const useGetValidatedDay = (date: Date | string) => {
  if (date === '') return;

  const dateObj = new Date(date);
  const day = dayjs(dateObj).format('dddd');

  return day[0];
};
