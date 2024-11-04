import { useDeleteGalleryImage } from '@/hooks/queries/invitation/useUpdateImages';
import { InvitationFormType } from '@/types/invitationFormType.type';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import { useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useFormContext } from 'react-hook-form';

type GalleryImageType = {
  imageUrl: string;
  index: number;
};

type GalleryPropType = Pick<InvitationFormType, 'gallery'>;

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

const WeddingGallery = ({ gallery }: GalleryPropType) => {
  const { setValue } = useFormContext();
  const images = gallery?.images || [];
  const gridType = gallery?.grid;
  const ratio = gallery?.ratio;
  const imgStyleClass = ratio === 'rectangle' ? 'w-full h-[500px]' : 'w-full h-full';
  const gridClass = gridType === 3 ? 'grid grid-cols-3 gap-2' : 'grid grid-cols-2 gap-2';
  const deleteImage = useDeleteGalleryImage();

  const handleDeleteImage = (imageUrl: string) => {
    deleteImage.mutate(imageUrl);
    setValue(
      'gallery.images',
      images.filter((img) => img !== imageUrl),
    );
  };

  const moveImage = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const updatedImages = [...images];
      const [removed] = updatedImages.splice(dragIndex, 1);
      updatedImages.splice(hoverIndex, 0, removed);
      setValue('gallery.images', updatedImages);
    },
    [images, setValue],
  );

  return (
    <div className={`${gridClass} p-2`}>
      {images.length > 0 ? (
        images.map((image, index) => (
          <GalleryImage
            key={image}
            image={image}
            index={index}
            handleDeleteImage={handleDeleteImage}
            moveImage={moveImage}
            ratio={ratio}
            imgStyleClass={imgStyleClass}
          />
        ))
      ) : (
        <div>업로드 된 사진이 없습니다.</div>
      )}
    </div>
  );
};

export default WeddingGallery;
