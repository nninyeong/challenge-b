import Image from 'next/image';
import { getIsLogin } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { getUserInfo } from '@/utils/server-action';
import LogoutButton from '@/components/mypage/LogoutButton';
import MyInvitationCard from '@/components/mypage/MyInvitationCard';

import MyPageNavigatorList from '@/components/mypage/MyPageNavigatorList';
import SetPrivateInvitation from '@/components/mypage/SetPrivateInvitation';

const MyPage = async (): Promise<JSX.Element | null> => {
  const isLogin = await getIsLogin();
  if (!isLogin) {
    redirect('/signin');
  }
  const user = await getUserInfo();
  const userId = user.user.id;
  const profileUrl = user?.user?.user_metadata?.avatar_url || '/assets/images/defaultImg.png';

  return (
    <div className='w-full mx-auto '>
      <div className='w-[90%] mx-auto pt-4  pb-1 '>
        <div className='w-full flex flex-col desktop:flex-row desktop:mb-20'>
          {user ? (
            <div className='desktop:h-[228px] desktop:w-[448px] flex desktop:flex-[2] flex-col desktop:mr-6 desktop:justify-between '>
              <div className='w-full flex items-center desktop:gap-6 desktop:pl-4 desktop:pr-4  desktop:pt-6 p-4 gap-4'>
                <div className='rounded-full w-[48px] h-[48px] desktop:w-[80px] desktop:h-[80px] overflow-hidden position: relative '>
                  <Image
                    src={profileUrl}
                    fill
                    alt='profileImage'
                    className='object-cover'
                    priority
                  />
                </div>
                <div className='flex flex-col'>
                  <h2 className='font-bold text-[16px] desktop:text-[24px]'>{user?.user?.user_metadata?.full_name}</h2>
                  <p className='text-[14px] desktop:text-[20px] text-gray-500 font-medium'>
                    {user?.user?.user_metadata?.email}
                  </p>
                </div>
              </div>
              <div className='hidden desktop:block'>
                <SetPrivateInvitation />
              </div>
            </div>
          ) : (
            <div>정보가 없습니다</div>
          )}

          <MyInvitationCard id={userId} />
        </div>
        <div className='block desktop:hidden'>
          <SetPrivateInvitation />
        </div>
        <MyPageNavigatorList />

        <LogoutButton />
      </div>
    </div>
  );
};

export default MyPage;
