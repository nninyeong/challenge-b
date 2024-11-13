import Image from 'next/image';
import { getIsLogin } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { getUserInfo } from '@/utils/server-action';
import LogoutButton from '@/components/mypage/LogoutButton';
import MyInvitationCard from '@/components/mypage/MyInvitationCard';
import TogglePrivate from '@/components/mypage/TogglePrivate';
import MyPageNavigatorList from '@/components/mypage/MyPageNavigatorList';

const MyPage = async (): Promise<JSX.Element | null> => {
  const isLogin = await getIsLogin();
  if (!isLogin) {
    redirect('/signin');
  }
  const user = await getUserInfo();
  const userId = user.user.id;
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

        <MyInvitationCard id={userId} />

        <div className='flex justify-between items-center gap-8 mt-4 p-4 bg-gray-100 rounded text-black font-bold '>
          <p>내 청첩장 공개하기 ON/OFF</p>
          <TogglePrivate />
        </div>
        <MyPageNavigatorList />

        <LogoutButton />
      </div>
    </div>
  );
};

export default MyPage;
