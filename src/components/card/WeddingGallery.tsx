import { useDeleteGalleryImage } from '@/hooks/queries/invitation/useUpdateImages';
import { InvitationFormType } from '@/types/invitationFormType.type';
import Image from 'next/image';
import { Control, useWatch } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemType = 'GALLERY_IMAGE';

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
    <DndProvider backend={HTML5Backend}>
      <div className={`${gridClass} p-2`}>
        {gallery && gallery.images.length > 0 ? (
          gallery.images.map((image, i) => (
            <DraggableImage
              key={image}
              index={i}
              image={image}
              handleDeleteImage={handleDeleteImage}
              imgStyleClass={imgStyleClass}
              ratio={ratio}
            />
          ))
        ) : (
          <div>업로드 된 사진이 없습니다.</div>
        )}
      </div>
    </DndProvider>
  );
};

type DraggableImageProps = {
  index: number;
  image: string;
  handleDeleteImage: (imageUrl: string) => void;
  imgStyleClass: string;
  ratio: string;
};

const DraggableImage: React.FC<DraggableImageProps> = ({ index, image, handleDeleteImage, imgStyleClass, ratio }) => {
  const [{ isDragging }, ref] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item: { index: number }) {
      if (item.index !== index) {
        // 이미지 위치 변경 로직
        moveImage(item.index, index);
        item.index = index; // Update the dragged item's index
      }
    },
  });

  return (
    <div
      ref={drop(ref)}
      className={`relative ${ratio === 'rectangle' ? 'aspect-[9/14]' : 'aspect-square'} ${isDragging ? 'opacity-50' : ''}`}
    >
      <Image
        src={image}
        alt={`galleryImage${index}`}
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
  );
};

const moveImage = (
  fromIndex: number,
  toIndex: number,
  images: string[],
  setImages: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  const updatedImages = [...images];
  const [movedImage] = updatedImages.splice(fromIndex, 1);
  updatedImages.splice(toIndex, 0, movedImage);
  setImages(updatedImages);
};

export default WeddingGallery;
