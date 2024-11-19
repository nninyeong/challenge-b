import Image from 'next/image';
import Link from 'next/link';

const LINK_IMAGES = [
  { name: 'github', url: 'https://github.com/nninyeong/challenge-b', image: '/assets/images/footer/github.png' },
  { name: 'blog', url: '', image: '/assets/images/footer/blog.png' },
  { name: 'kakaoTalk', url: '', image: '/assets/images/footer/kakaoTalk.png' },
];

const Footer = () => {
  return (
    <footer className='flex flex-col jsutify-center items-center bg-gray-50 gap-[25px] desktop:px-[573px] desktop:pt-[163px] desktop:pb-[108px] px-[82px] pt-[96px] pb-[96px]'>
      <div className='flex gap-[24px]'>
        {LINK_IMAGES.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.url}
              className='relative desktop:w-[40px] desktop:h-[40px] w-[32px] h-[32px] overflow-hidden'
            >
              <Image
                src={link.image}
                alt={link.name}
                layout='fill'
                objectFit='cover'
              />
            </Link>
          );
        })}
      </div>
      <p className='desktop:text-[14px] text-[10px] text-gray-700 font-medium'>
        Copyright ⓒ 드림카드 2024, All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
