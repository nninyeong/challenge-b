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
      className='flex justify-center items-center bg-gray-600/50 rounded w-[71px] h-[71px] hover:cursor-pointer'
      onClick={handleSelectSticker}
    >
      <Image
        alt='sticker'
        key={stickerImage.id}
        src={stickerImage.url}
        className='w-16 h-16 object-cover m-2'
        width={100}
        height={100}
      />
    </div>
  );
};

export default StickerSlot;
