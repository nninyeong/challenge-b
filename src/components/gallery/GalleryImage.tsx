import Image from 'next/image';
import { useDrag, useDrop } from 'react-dnd';
import { IoClose } from 'react-icons/io5';
type GalleryImageType = {
  imageUrl: string;
  index: number;
};

const GalleryImage = ({
  image,
  index,
  moveImage,
  handleDeleteImage,
  ratio,
  imgStyleClass,
}: {
  image: string;
  index: number;
  moveImage: (dragIndex: number, hoverIndex: number) => void;
  handleDeleteImage: (url: string) => void;
  ratio: string;
  imgStyleClass: string;
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'image',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'image',
    hover: (item: GalleryImageType) => {
      if (item.index !== index) {
        moveImage(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => {
        if (node) {
          drag(drop(node));
        }
      }}
      className={`relative transition-all duration-900 ease-in-out ${ratio === 'rectangle' ? 'aspect-[9/14]' : 'aspect-square'} ${isDragging ? 'opacity-50' : ''}`}
      style={{ transform: isDragging ? 'scale(1.05)' : 'scale(1)' }}
    >
      <Image
        src={image}
        alt={`galleryImage${index}`}
        className={`${imgStyleClass} cursor-pointer`}
        layout='fill'
        objectFit='cover'
      />
      <IoClose
        className='cursor-pointer text-white absolute right-2 top-2 bg-gray-800/50'
        size={15}
        onClick={() => handleDeleteImage(image)}
      />
    </div>
  );
};

export default GalleryImage;
