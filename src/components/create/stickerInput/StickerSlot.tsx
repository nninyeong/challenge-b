import { StickerImage } from '@/types/stickerData.types';
import Image from 'next/image';
import { useFormContext, useWatch } from 'react-hook-form';

type PropsType = {
  stickerImage: StickerImage;
};

const StickerSlot = ({ stickerImage }: PropsType) => {
  const { setValue, control } = useFormContext();
  const stickersWatch = useWatch({
    control,
    name: 'stickers',
  });

  const handleSelectSticker = () => {
    const stickers = stickersWatch || [];

    stickers.push({
      id: `${crypto.randomUUID()}-${stickerImage.id}`,
      url: `${stickerImage.url}`,
      stickerImageId: stickerImage.id,
      posX: '0',
      posY: '0',
    });

    setValue('stickers', stickers);
  };

  return (
    <div
      className='flex justify-center items-center border border-gray-200 rounded-[12px] aspect-square w-full h-full hover:cursor-pointer'
      onClick={handleSelectSticker}
    >
      <Image
        alt='sticker'
        key={stickerImage.id}
        src={stickerImage.url}
        className='object-fit m-[8px]'
        width={100}
        height={100}
      />
    </div>
  );
};

export default StickerSlot;
