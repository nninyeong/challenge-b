'use client';

import { useGetAllinvitationCard } from '@/hooks/queries/mypage/useMypage';
import { useDownloadCsv } from '@/hooks/queries/mypage/useDownloadCsv';

type MenuItemProps = {
  name: string;
  onClick?: () => void;
};

const MyPageMenuItem: React.FC<MenuItemProps> = ({ name, onClick }) => {
  const { downloadCsv } = useDownloadCsv();
  const { data: invitationCards } = useGetAllinvitationCard();
  const invitationCardId = invitationCards?.[0]?.id;

  const handleClick = () => {
    if (name === '방문객 명단 다운로드' && invitationCardId) {
      downloadCsv();
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <li
      onClick={handleClick}
      className='w-full border border-solid border-l-0 border-r-0 border-t-0 border-gray-100 cursor-pointer'
    >
      <div className='flex justify-between items-center p-2'>
        {name}
        <img
          src='/assets/images/icons/chevron-right.webp'
          alt='필드펴기'
          className='desktop:w-[32px] desktop:h-[32px] w-[24px] h-[24px]'
        />
      </div>
    </li>
  );
};

export default MyPageMenuItem;
