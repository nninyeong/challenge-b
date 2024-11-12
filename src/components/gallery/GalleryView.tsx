import Image from 'next/image';

type GalleryViewProps = {
  gallery: {
    images: string[];
    grid: number;
    ratio: string;
  };
};

const GalleryView = ({ gallery }: GalleryViewProps) => {
  const imgStyleClass = gallery.ratio === 'rectangle' ? 'aspect-[9/14]' : 'aspect-square';
  const gridClass = gallery.grid === 3 ? 'grid grid-cols-3 gap-2' : 'grid grid-cols-2 gap-2';

  return (
    <div className='mt-8 mb-8'>
      <p className=' text-center mb-8 text-[16px] text-opacity-50 tracking-wider'>GALLERY</p>
      <div className={`w-full ${gridClass}  gap-3.5 p-4`}>
        {gallery.images.map((image, index) => (
          <div
            key={image}
            className={`${imgStyleClass} relative w-full h-full`}
          >
            <Image
              src={image}
              alt={`galleryImage${index}`}
              className='cursor-pointer'
              layout='fill'
              objectFit='cover'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryView;
