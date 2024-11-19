'use client';
import { useDeleteGalleryImage } from '@/hooks/queries/invitation/useUpdateImages';
import { InvitationFormType } from '@/types/invitationFormType.type';
import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import GalleryImage from '../gallery/GalleryImage';
import colorConverter from '@/utils/colorConverter';
import { useGalleryImagePreviewStore } from '@/store/useCompressedImages';

type GalleryPropType = Pick<InvitationFormType, 'gallery' | 'fontInfo'>;

const WeddingGallery = ({ gallery, fontInfo }: GalleryPropType) => {
  const { galleryPreviewUrls } = useGalleryImagePreviewStore();
  const { setValue } = useFormContext();
  const { images = [], grid: gridType, ratio } = gallery || {};
  const imgStyleClass = ratio === 'rectangle' ? 'w-full h-[500px]' : 'w-full h-full';
  const gridClass = `grid ${gridType === 3 ? 'grid-cols-3' : 'grid-cols-2'} gap-2 transition-all duration-300 ease-in-out`;
  const deleteImage = useDeleteGalleryImage();

  const [galleryImgUrls, setGalleryImgUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteImage = (imageUrl: string) => {
    deleteImage.mutate(imageUrl);
    setValue(
      'gallery.images',
      images.filter((img) => img !== imageUrl),
    );
  };

  const moveImage = (dragIndex: number, hoverIndex: number) => {
    const updatedImages = [...images];
    const [removed] = updatedImages.splice(dragIndex, 1);
    updatedImages.splice(hoverIndex, 0, removed);
    setValue('gallery.images', updatedImages);
  };

  const { size, color } = fontInfo;
  const rgbaColor = colorConverter(color);

  useEffect(() => {
    if (images && images.length > 0) {
      setGalleryImgUrls(images);

      setLoading(false);
    } else if (galleryPreviewUrls && galleryPreviewUrls.length > 0) {
      setGalleryImgUrls(galleryPreviewUrls);
      setLoading(true);
    }

    console.log(images, 'images');
    console.log(galleryImgUrls, 'galleryImgUrls');
    console.log(loading, 'loading');
  }, [images, galleryPreviewUrls, loading]);

  const handleLoading = () => setLoading(false);
  return (
    <div
      style={{ fontSize: `${16 + size}px`, color: `${rgbaColor}` }}
      className='mb-[56px] h-fit'
    >
      <p className='text-center mb-8 text-opacity-50 tracking-wider'>GALLERY</p>

      {images.length > 0 || galleryPreviewUrls.length > 0 ? (
        <div className={`${gridClass} gap-3.5 p-4`}>
          {galleryImgUrls.map((image: string, index: number) => (
            <GalleryImage
              key={image}
              image={image}
              index={index}
              handleDeleteImage={handleDeleteImage}
              moveImage={moveImage}
              ratio={ratio}
              imgStyleClass={imgStyleClass}
              loading={loading}
              handleLoading={handleLoading}
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
