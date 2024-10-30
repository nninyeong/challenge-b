import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LinkToMypage = () => {
  const path = usePathname();

  return (
    <Link href='/mypage'>
      <button
        className={`w-[24px] h-[24px] ${path === '/mypage' ? 'bg-user-profile-selected' : 'bg-user-profile-02'}`}
      />
    </Link>
  );
};

export default LinkToMypage;
