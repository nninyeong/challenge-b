import MessageIcon from '@/components/icons/MessageIcon';
import PhoneIcon from '@/components/icons/PhoneIcon';
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
          <PhoneIcon color={fontColor} />
        </a>
        <a
          href={`sms:${phoneNumber}`}
          className='flex justify-center items-center relative rounded-t-lg overflow-hidden'
          onClick={handlePhoneClick}
        >
          {' '}
          <MessageIcon color={fontColor} />
        </a>
      </div>
    </div>
  );
};

export default PersonalInfoCard;
