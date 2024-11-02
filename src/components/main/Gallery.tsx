import Image from 'next/image';

const Gallery = () => {
  const placeholderImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6c3aYUkJ6HhXVkwqnenl9C4xGHtrvCSrZQQ&s';
  const images = Array(14).fill(placeholderImg);

  return (
    <div className='flex flex-col gap-[40px] mb-[56px]'>
      <div>
        <h1 className='text-[20px] font-semibold'>드림카드 갤러리</h1>
        <p className='text-[14px]'>드림카드 모바일 청첩장 디자인을 둘러보세요.</p>
      </div>
      <div className='flex justify-around overflow-x-auto scrollbar-hidden'>
        <div className='grid grid-rows-2 grid-flow-col gap-4 h-[416px] max-w-[1440px]'>
          {images.map((image, index) => (
            <div
              key={`이미지${index}`}
              className='relative w-[152px] h-[200px] rounded-lg overflow-hidden'
            >
              <Image
                src={image}
                alt={`디자인 이미지${index}`}
                layout='fill'
                objectFit='cover'
                priority
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
