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
    <div className='w-full mx-auto p-[16px]'>
      <div className=' desktop:w-[1136px] mx-auto pt-[16px]  pb-[4px] '>
        <div className='w-full desktop:w-[448px] desktop:flex desktop:flex-row mobile:flex mobile:flex-col desktop:mb-[80px]'>
          {user ? (
            <div className='desktop:h-[228px] desktop:w-[448px] flex  desktop:flex-[2] flex-col desktop:mr-[24px] desktop:justify-between w-[343px] h-[80px]'>
              <div className='desktop:h-[128px] flex items-center  desktop:gap-[24px] desktop:pr-[16px]  desktop:pt-[24px]  mobile:gap-[16px] mobile:pl-[16px]'>
                <div className='rounded-full mobile:w-[48px] mobile:h-[48px] desktop:w-[80px] desktop:h-[80px] overflow-hidden position: relative '>
                  <Image
                    src={profileUrl}
                    fill
                    alt='profileImage'
                    className='object-cover'
                    priority
                  />
                </div>
                <div className='flex flex-col '>
                  <h2 className='font-bold text-[16px] desktop:text-[24px] font-gray-800'>
                    {user?.user?.user_metadata?.full_name}
                  </h2>
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
        <div className='block desktop:hidden mobile:mt-[16px]'>
          <SetPrivateInvitation />
        </div>
        <MyPageNavigatorList />

        <LogoutButton />
      </div>
    </div>
  );
};

export default MyPage;
