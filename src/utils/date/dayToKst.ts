import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const convertToUserTimezone = (utcDateString: string) => {
  
  const userTimezone = dayjs.tz.guess();

  const userDate = dayjs.utc(utcDateString).tz(userTimezone);

  return {
    year: userDate.format('YYYY'),     
    month: userDate.format('MM'),      
    day: userDate.format('DD'),        
    hour: userDate.format('HH'),       
    minute: userDate.format('mm'),     
    second: userDate.format('ss'),     
  };
};

export default convertToUserTimezone;
