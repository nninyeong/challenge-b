import { StickerImage } from '@/types/stickerData.types';
import Image from 'next/image';
import { useFormContext, useWatch } from 'react-hook-form';

type PropsType = {
  sticker: StickerImage;
};

const StickerSlot = ({ sticker }: PropsType) => {
  const { setValue, control } = useFormContext();
  const stickersWatch = useWatch({
    control,
    name: 'stickers',
  });

  const handleSelectSticker = () => {
    const stickers = stickersWatch || [];
    console.log('prevStickers: ', stickers);

    stickers.push({ id: `${crypto.randomUUID()}-${sticker.id}`, stickerImageId: sticker.id, posX: '0', posY: '0' });
    setValue('stickers', stickers);
  };

  return (
    <div
      className='flex justify-center items-center bg-gray-600/50 rounded w-[71px] h-[71px] hover:cursor-pointer'
      onClick={handleSelectSticker}
    >
      <Image
        alt='sticker'
        key={sticker.id}
        src={sticker.url}
        className='w-16 h-16 object-cover m-2'
        width={100}
        height={100}
      />
    </div>
  );
};

export default StickerSlot;
