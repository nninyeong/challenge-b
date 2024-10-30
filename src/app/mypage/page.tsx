import Image from 'next/image';
import { getIsLogin } from '@/utils/supabase/server';
import { FaChevronRight } from 'react-icons/fa';
import { redirect } from 'next/navigation';
import { getUserInfo } from '@/utils/server-action';
import LogoutButton from '@/components/mypage/LogoutButton';

import MyInvitationCard from '@/components/mypage/MyInvitationCard';
import Link from 'next/link';
import TogglePrivate from '@/components/mypage/TogglePrivate';

const MyPage = async (): Promise<JSX.Element | null> => {
  const isLogin = await getIsLogin();

  if (!isLogin) {
    redirect('/signin');
  }
  const user = await getUserInfo();

  const profileUrl = user?.user?.user_metadata?.avatar_url || '/assets/images/defaultImg.png';

  return (
    <div className='w-full mx-auto'>
      <div className='w-[90%] mx-auto pt-4  pb-1'>
        {user ? (
          <div className='flex gap-8 items-center '>
            <div className='rounded-full w-[48px] h-[48px] overflow-hidden'>
              <Image
                src={profileUrl}
                width={100}
                height={100}
                alt='profileImage'
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                priority
              />
            </div>
            <div className='flex flex-col'>
              <h2 className='font-bold text-[1rem]'>{user?.user?.user_metadata?.full_name}</h2>
              <p className='text-[0.8rem]'>{user?.user?.user_metadata?.email}</p>
            </div>
          </div>
        ) : (
          <div>정보가 없습니다</div>
        )}

        <MyInvitationCard />

        <div className='flex justify-cebter items-center gap-8 mt-4 p-4 bg-gray-100 rounded text-black font-bold '>
          <p>내 청첩장 공개하기 ON/OFF</p>
          <TogglePrivate />
        </div>
        <nav className='mt-4'>
          <ul className='flex flex-col gap-4 items-center'>
            {MENULISTS.map((menu) => (
              <Link
                href={menu.href}
                key={menu.name}
                className='w-full  border border-solid border-l-0 border-r-0 border-t-0 border-gray-100  cursor-pointer'
              >
                <li className='flex justify-between items-center p-2'>
                  {menu.name}
                  <FaChevronRight className='text-gray-700' />
                </li>
              </Link>
            ))}
          </ul>
        </nav>

        <LogoutButton />
      </div>
    </div>
  );
};

export default MyPage;

const MENULISTS = [
  { name: '결제내역', href: '/' },
  { name: '1:1문의', href: '/' },
  { name: '방문객 명단 다운로드', href: '/' },
  { name: '나의 후기관리', href: '/review' },
];
