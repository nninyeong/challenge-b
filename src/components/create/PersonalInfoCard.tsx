import { CiMail } from 'react-icons/ci';
import { IoIosCall } from 'react-icons/io';

type PersonInfoCardProps = {
  label: string | null;
  name: string;
  phoneNumber: string;
};

const PersonalInfoCard = ({ label, name, phoneNumber }: PersonInfoCardProps) => {
  return (
    <div className='flex flex-col justify-center items-center gap-2'>
      <div className='flex  items-center gap-2'>
        {label && <p className='text-center'>{label}</p>}
        <p className='text-xl font-semibold'>{name ? name : '이름'}</p>
      </div>

      <div className='flex gap-5'>
        <a
          href={`tel:${phoneNumber}`}
          className='flex justify-center items-center relative rounded-t-lg overflow-hidden'
        >
          <IoIosCall className='text-2xl' />
        </a>
        <a
          href={`sms:${phoneNumber}`}
          className='flex justify-center items-center relative rounded-t-lg overflow-hidden'
        >
          <CiMail className='text-2xl' />
        </a>
      </div>
    </div>
  );
};

export default PersonalInfoCard;
