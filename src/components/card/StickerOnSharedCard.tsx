import { StickerType } from '@/types/invitationFormType.type';
import Image from 'next/image';

const StickerOnSharedCard = ({ sticker }: { sticker: StickerType }) => {
  return (
    <Image
      src={sticker.url}
      alt=''
      width={sticker.width}
      height={sticker.height}
      style={{
        position: 'absolute',
        top: `${sticker.posY}%`,
        left: `${sticker.posX}%`,
      }}
    />
  );
};

export default StickerOnSharedCard;
