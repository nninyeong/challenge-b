import Image from 'next/image';

const Gallery = () => {
  const placeholderImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6c3aYUkJ6HhXVkwqnenl9C4xGHtrvCSrZQQ&s';
  const images = Array(14).fill(placeholderImg);

  return (
    <div className='flex flex-col gap-[40px]'>
      <div>
        <h1 className='text-[20px] font-semibold'>드림카드 갤러리</h1>
        <p className='text-[14px]'>드림카드 모바일 청첩장 디자인을 둘러보세요.</p>
      </div>
      {/* 가로 스크롤을 위한 외부 컨테이너 */}
      <div className='overflow-x-auto'>
        <div className='grid grid-cols-7 gap-4 w-full min-w-[375px]'>
          {images.map((image, index) => {
            return (
              <div
                key={`이미지${index}`}
                className='relative w-[152px] h-[200px] rounded-lg overflow-hidden flex-shrink-0'
              >
                <Image
                  src={image}
                  alt={`디자인 이미지${index}`}
                  layout='fill'
                  objectFit='cover'
                  priority
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
