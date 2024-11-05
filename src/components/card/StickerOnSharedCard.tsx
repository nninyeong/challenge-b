import { StickerType } from '@/types/invitationFormType.type';

const StickerOnSharedCard = ({ sticker }: { sticker: StickerType }) => {
  return (
    <img
      src={sticker.url}
      alt=''
      style={{
        position: 'absolute',
        top: `${sticker.posY}%`,
        left: `${sticker.posX}%`,
        transform: `rotate(${sticker.rotation}deg)`,
        width: sticker.width,
        height: sticker.height,
      }}
    />
  );
};

export default StickerOnSharedCard;
