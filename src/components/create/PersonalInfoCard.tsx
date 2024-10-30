import Image from 'next/image';

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
          className='relative w-[30px] h-[30px] rounded-t-lg overflow-hidden'
        >
          <Image
            src='/images/phone.png'
            alt='전화 이미지'
            layout='fill'
            objectFit='cover'
          />
        </a>
        <a
          href={`sms:${phoneNumber}`}
          className='relative w-[30px] h-[30px] rounded-t-lg overflow-hidden'
        >
          <Image
            src='/images/mail.png'
            alt='문자 이미지'
            layout='fill'
            objectFit='cover'
          />
        </a>
      </div>
    </div>
  );
};

export default PersonalInfoCard;
