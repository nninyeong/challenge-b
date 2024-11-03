import { useDeleteGalleryImage } from '@/hooks/queries/invitation/useUpdateImages';
import { InvitationFormType } from '@/types/invitationFormType.type';
import Image from 'next/image';
import { Control, useWatch } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';

const WeddingGallery = ({ control }: { control: Control<InvitationFormType> }) => {
  const gallery = useWatch({ control, name: 'gallery' });
  const gridType = gallery?.grid;
  const ratio = gallery?.ratio;

  const imgStyleClass = ratio === 'rectangle' ? 'w-full h-[500px]' : 'w-full h-full';

  const gridClass = gridType === 3 ? 'grid grid-cols-3 gap-2' : 'grid grid-cols-2 gap-2';

  const deleteImage = useDeleteGalleryImage();

  const handleDeleteImage = (imageUrl: string) => {
    deleteImage.mutate(imageUrl);
  };
  return (
    <div className={`${gridClass} p-2`}>
      {gallery && gallery.images.length > 0 ? (
        gallery.images.map((image, i) => (
          <div
            key={image}
            className={`relative ${ratio === 'rectangle' ? 'aspect-[9/14]' : 'aspect-square'}`}
          >
            <Image
              src={image}
              alt={`galleryImage${i}`}
              className={imgStyleClass}
              layout='fill'
              objectFit='cover'
            />
            <IoClose
              className='cursor-pointer text-white absolute right-2 top-2'
              size={30}
              onClick={() => handleDeleteImage(image)}
            />
          </div>
        ))
      ) : (
        <div>업로드 된 사진이 없습니다.</div>
      )}
    </div>
  );
};

export default WeddingGallery;
