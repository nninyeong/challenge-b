import { InvitationFormType } from '@/types/invitationFormType.type';
import Image from 'next/image';

type GalleryPropType = Pick<InvitationFormType, 'gallery'>;
const WeddingGallery = ({ gallery }: GalleryPropType) => {
  const gridType = gallery?.grid;
  const ratio = gallery?.ratio;

  const imgStyleClass = ratio === 'rectangle' ? 'w-full h-[500px]' : 'w-full h-full';

  const gridClass = gridType === 3 ? 'grid grid-cols-3 gap-2' : 'grid grid-cols-2 gap-2';

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
          </div>
        ))
      ) : (
        <div>업로드 된 사진이 없습니다.</div>
      )}
    </div>
  );
};

export default WeddingGallery;
