'use client';
import { useDeleteGalleryImage } from '@/hooks/queries/invitation/useUpdateImages';
import { InvitationFormType } from '@/types/invitationFormType.type';
import { useCallback } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import GalleryImage from '../gallery/GalleryImage';

type GalleryPropType = Pick<InvitationFormType, 'gallery'>;

const WeddingGallery = ({ gallery }: GalleryPropType) => {
  const { setValue } = useFormContext();
  const { images = [], grid: gridType, ratio } = gallery || {};
  const imgStyleClass = ratio === 'rectangle' ? 'w-full h-[500px]' : 'w-full h-full';
  const gridClass = `grid ${gridType === 3 ? 'grid-cols-3' : 'grid-cols-2'} gap-2 transition-all duration-300 ease-in-out`;
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

  const fontSize = useWatch({ name: 'fontInfo.size' });
  const fontColor = useWatch({ name: 'fontInfo.color' });
  const rgbaColor = `rgba(${fontColor.r}, ${fontColor.g}, ${fontColor.b}, ${fontColor.a})`;

  return (
    <div
      style={{ fontSize: `${16 + fontSize}px`, color: `${rgbaColor}` }}
      className='mb-[56px] h-fit'
    >
      <p className='text-center mb-8 text-opcity-50 tracking-wider'>GALLERY</p>

      {images.length > 0 ? (
        <div className={`${gridClass} gap-3.5 p-4`}>
          {images.map((image, index) => (
            <GalleryImage
              key={image}
              image={image}
              index={index}
              handleDeleteImage={handleDeleteImage}
              moveImage={moveImage}
              ratio={ratio}
              imgStyleClass={imgStyleClass}
            />
          ))}
        </div>
      ) : (
        <div className='w-full text-center'>업로드 된 사진이 없습니다.</div>
      )}
    </div>
  );
};

export default WeddingGallery;
