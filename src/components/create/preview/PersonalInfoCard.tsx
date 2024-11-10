import { Notify } from 'notiflix';
import { useFontStore } from '@/store/useFontStore';

type PersonInfoCardProps = {
  label: string | null;
  name: string | null;
  phoneNumber: string | null;
};

const DEFAULT_NAME = '이름';
const DEFAULT_LABEL = '관계';
const DEFAULT_PHONE_NUMBER = '전화번호를 입력하세요';

const PersonalInfoCard = ({ label, name, phoneNumber }: PersonInfoCardProps) => {
  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!phoneNumber) {
      e.preventDefault();
      Notify.warning(DEFAULT_PHONE_NUMBER);
    }
  };
  const fontSize = useFontStore((state) => state.fontSize);
  return (
    <div
      style={{ fontSize: `${16 + fontSize}px` }}
      className='flex flex-col justify-center items-center gap-2'
    >
      <div className='flex items-center gap-2'>
        <p className='text-center'>{label || DEFAULT_LABEL}</p>
        <p className='text-xl font-semibold'>{name || DEFAULT_NAME}</p>
      </div>

      <div className='flex gap-4'>
        <a
          href={`tel:${phoneNumber}`}
          className='flex justify-center items-center relative rounded-t-lg overflow-hidden'
          onClick={handlePhoneClick}
        >
          <img
            src='/assets/images/icons/phone.svg'
            alt='전화'
            className='w-[24px] h-[24px]'
          />
        </a>
        <a
          href={`sms:${phoneNumber}`}
          className='flex justify-center items-center relative rounded-t-lg overflow-hidden'
          onClick={handlePhoneClick}
        >
          <img
            src='/assets/images/icons/mail-05.svg'
            alt='문자'
            className='w-[24px] h-[24px]'
          />
        </a>
      </div>
    </div>
  );
};

export default PersonalInfoCard;
