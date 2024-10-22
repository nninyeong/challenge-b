import Image from 'next/image';
import defaultImage from '@/assets/images/defaultImg.jpg';
import { createClient, getIsLogin } from '@/utils/supabase/server';
import { SiTinyletter } from 'react-icons/si';
import { TiExport } from 'react-icons/ti';
import { FaFileDownload } from 'react-icons/fa';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdOutlineQuestionAnswer } from 'react-icons/md';
import { GoHeartFill } from 'react-icons/go';
import { MdRateReview } from 'react-icons/md';
import { redirect } from 'next/navigation';

const MyPage = async (): Promise<JSX.Element | null> => {
  const isLogin = await getIsLogin();
  if (!isLogin) {
    redirect('/signin');
  }

  const serverClient = createClient();
  const {
    data: { user },
  } = await serverClient.auth.getUser();

  const profileUrl = user?.user_metadata?.avatar_url || defaultImage;

  return (
    <div className='w-[375px] mx-auto bg-gray-700'>
      <div className='w-[90%] mx-auto pt-1 pb-1'>
        {user ? (
          <div className='flex gap-8 items-center mt-12'>
            <div className='rounded'>
              <Image
                src={profileUrl}
                width={100}
                height={100}
                alt='profileImage'
                style={{ borderRadius: '50%' }}
              />
            </div>
            <h2 className='font-bold text-2xl'>{user?.user_metadata?.full_name}</h2>
          </div>
        ) : (
          <div>정보가 없습니다</div>
        )}
        <div className='flex justify-around gap-8 mt-12'>
          {MENUCARDS.map((menucard) => (
            <div
              key={menucard.menu}
              className='w-[30%] justify-center items-center gap-8 p-2 bg-gray-400 rounded cursor-pointer'
            >
              <div className='flex justify-center items-center mb-8'>{menucard.icon}</div>
              <p className='text-center text-black font-extrabold'>{menucard.menu}</p>
            </div>
          ))}
        </div>
        <nav className='mt-12'>
          {MENULISTS.map((menulist) => (
            <ul
              key={menulist.menu}
              className='cursor-pointer flex gap-4 items-center pb-4 pt-4 border border-solid border-l-0 border-r-0 border-t-0'
            >
              <li>{menulist.icon}</li>
              <li>{menulist.menu}</li>
            </ul>
          ))}
        </nav>
        <div className='w-full bg-gray-400 text-black font-bold p-4 mt-12 mb-12 rounded text-center cursor-pointer'>
          로그아웃
        </div>
      </div>
    </div>
  );
};

export default MyPage;

const MENUCARDS = [
  { icon: <SiTinyletter size={50} />, menu: '내 청첩장 보기' },
  { icon: <TiExport size={50} />, menu: '청첩장 공유하기' },
  { icon: <FaFileDownload size={50} />, menu: '방문객 명단 다운로드' },
];

const MENULISTS = [
  { icon: <AiOutlineShoppingCart size={20} />, menu: '결재내역' },
  { icon: <MdOutlineQuestionAnswer size={20} />, menu: '1:1 문의' },
  { icon: <GoHeartFill size={20} />, menu: '내 찜리스트' },
  { icon: <MdRateReview size={20} />, menu: '나의 후기 관리' },
];
