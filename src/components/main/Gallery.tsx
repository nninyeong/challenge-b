import Image from 'next/image';

const IMAGES = [
  '/assets/images/gallery/1.png',
  '/assets/images/gallery/2.png',
  '/assets/images/gallery/3.png',
  '/assets/images/gallery/4.png',
  '/assets/images/gallery/5.png',
  '/assets/images/gallery/6.png',
  '/assets/images/gallery/7.png',
  '/assets/images/gallery/8.png',
];

const Gallery = () => {
  return (
    <div className='flex flex-col desktop:mb-[80px] mb-[56px]'>
      <div className='desktop:mb-[56px] mb-[24px]'>
        <h1 className='desktop:text-[36px] text-[20px] font-semibold'>드림카드 갤러리</h1>
        <p className='desktop:text-[24px] text-[14px]'>드림카드 모바일 청첩장 디자인을 둘러보세요.</p>
      </div>
      <div className='flex justify-around overflow-x-auto scrollbar-hidden'>
        <div className='grid grid-rows-2 grid-flow-col desktop:gap-[32px] gap-[16px] desktop:h-[720px] h-[416px] max-w-[1440px]'>
          {IMAGES.map((image, index) => (
            <div
              key={`이미지${index}`}
              className='relative desktop:w-[260px] w-[152px] desktop:h-[344px] h-[200px] rounded-lg overflow-hidden'
            >
              <Image
                src={image}
                alt={`디자인 이미지${index}`}
                layout='fill'
                objectFit='cover'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
