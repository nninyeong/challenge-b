import { CiMail } from 'react-icons/ci';
import { IoIosCall } from 'react-icons/io';

type PersonInfoCardProps = {
  label: string | null;
  name: string | null;
  phoneNumber: string | null;
};

const PersonalInfoCard = ({ label, name, phoneNumber }: PersonInfoCardProps) => {
  const defaultName = '이름';
  const defaultLabel = '관계';
  const defaultPhoneNumber = '번호를 입력하세요';

  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!phoneNumber) {
      e.preventDefault();
      alert(defaultPhoneNumber);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center gap-2'>
      <div className='flex items-center gap-2'>
        <p className='text-center'>{label || defaultLabel}</p>
        <p className='text-xl font-semibold'>{name || defaultName}</p>
      </div>

      <div className='flex gap-5'>
        <a
          href={`tel:${phoneNumber}`}
          className='flex justify-center items-center relative rounded-t-lg overflow-hidden'
          onClick={handlePhoneClick}
        >
          <IoIosCall className='text-2xl' />
        </a>
        <a
          href={`sms:${phoneNumber}`}
          className='flex justify-center items-center relative rounded-t-lg overflow-hidden'
          onClick={handlePhoneClick}
        >
          <CiMail className='text-2xl' />
        </a>
      </div>
    </div>
  );
};

export default PersonalInfoCard;
