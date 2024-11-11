import { Notify } from 'notiflix';

type PersonInfoCardProps = {
  label: string | null;
  name: string | null;
  phoneNumber: string | null;
  fontSize: number;
  fontColor: string;
};

const DEFAULT_NAME = '이름';
const DEFAULT_LABEL = '관계';
const DEFAULT_PHONE_NUMBER = '전화번호를 입력하세요';

const PersonalInfoCard = ({ label, name, phoneNumber, fontSize, fontColor }: PersonInfoCardProps) => {
  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!phoneNumber) {
      e.preventDefault();
      Notify.warning(DEFAULT_PHONE_NUMBER);
    }
  };

  return (
    <div
      style={{ fontSize: `${16 + fontSize}px`, color: `${fontColor}` }}
      className='flex flex-col justify-center items-center gap-2'
    >
      <div className='flex items-center gap-2'>
        <p className='text-center'>{label || DEFAULT_LABEL}</p>
        <p
          style={{ fontSize: `${20 + fontSize}px` }}
          className=' font-semibold'
        >
          {name || DEFAULT_NAME}
        </p>
      </div>

      <div className='flex gap-4'>
        <a
          href={`tel:${phoneNumber}`}
          className='flex justify-center items-center relative rounded-t-lg overflow-hidden'
          onClick={handlePhoneClick}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill={fontColor}
          >
            <path
              d='M20.6638 18.771C20.6638 18.771 19.5052 19.909 19.2212 20.2427C18.7587 20.7363 18.2137 20.9693 17.4992 20.9693C17.4305 20.9693 17.3573 20.9693 17.2886 20.9648C15.9284 20.8779 14.6644 20.3478 13.7164 19.8953C11.1243 18.643 8.84819 16.8652 6.95678 14.612C5.3951 12.7336 4.35093 10.9969 3.6594 9.13217C3.23349 7.99415 3.07778 7.1075 3.14647 6.27113C3.19227 5.7364 3.39835 5.29308 3.77847 4.91374L5.34015 3.35526C5.56455 3.14502 5.8027 3.03076 6.03626 3.03076C6.32478 3.03076 6.55835 3.20443 6.7049 3.35069C6.70948 3.35526 6.71406 3.35983 6.71864 3.3644C6.998 3.62491 7.26362 3.89456 7.54298 4.18249C7.68495 4.32874 7.8315 4.47499 7.97805 4.62581L9.22831 5.87351C9.71376 6.35797 9.71376 6.80586 9.22831 7.29032C9.0955 7.42286 8.96727 7.5554 8.83446 7.68337C8.44976 8.07642 8.75196 7.77483 8.35353 8.13132C8.34437 8.14046 8.33521 8.14503 8.33063 8.15417C7.93677 8.54722 8.01005 8.93113 8.09248 9.19164C8.09706 9.20535 8.10164 9.21906 8.10622 9.23277C8.43138 10.0189 8.88935 10.7593 9.58547 11.6413L9.59005 11.6459C10.854 13.1998 12.1867 14.411 13.6568 15.3387C13.8446 15.4576 14.0369 15.5536 14.2201 15.645C14.385 15.7272 14.5407 15.8049 14.6735 15.8872C14.6918 15.8963 14.7101 15.91 14.7285 15.9192C14.8842 15.9969 15.0307 16.0334 15.1819 16.0334C15.562 16.0334 15.8001 15.7958 15.878 15.7181L16.7757 14.8222C16.9314 14.6668 17.1787 14.4795 17.4672 14.4795C17.7511 14.4795 17.9847 14.6577 18.1267 14.8131C18.1312 14.8177 18.1312 14.8177 18.1358 14.8222L20.6592 17.3405C21.1309 17.8067 20.6638 18.771 20.6638 18.771Z'
              stroke='#8C8C8C'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        </a>
        <a
          href={`sms:${phoneNumber}`}
          className='flex justify-center items-center relative rounded-t-lg overflow-hidden'
          onClick={handlePhoneClick}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill={fontColor}
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M3.6875 5.76838L12 12.7445L20.9062 5.76838M9.52566 12.0001L3.6875 18.4522M20.3125 17.9237L14.4736 12.0001M4.875 19.5C3.56332 19.5 2.5 18.3643 2.5 16.9632V7.03677C2.5 5.63575 3.56332 4.5 4.875 4.5H19.125C20.4367 4.5 21.5 5.63575 21.5 7.03676V16.9632C21.5 18.3643 20.4367 19.5 19.125 19.5H4.875Z'
              stroke='#8C8C8C'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default PersonalInfoCard;
