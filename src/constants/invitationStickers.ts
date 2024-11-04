import { StickerType } from '@/types/invitationFormType.type';

export const DECORATE_STICKERS: StickerType[] = [
  {
    id: `${crypto.randomUUID()}-classic-001`,
    url: 'https://llgxyrndifqzbvolykbu.supabase.co/storage/v1/object/public/stickers/classic-001.png',
    posX: '0.29384328358208955',
    posY: '8.666666666666668',
    width: 70,
    height: 70,
    stickerImageId: 'classic-001.png',
    rotation: 0,
  },
  {
    id: `${crypto.randomUUID()}-simple-003.svg`,
    url: 'https://llgxyrndifqzbvolykbu.supabase.co/storage/v1/object/public/stickers/simple-003.svg',
    posX: '6.267029972752043',
    posY: '2',
    width: 313,
    height: 65,
    stickerImageId: 'simple-003.svg',
    rotation: 0,
  },
  {
    id: `${crypto.randomUUID()}-modern-001`,
    url: 'https://llgxyrndifqzbvolykbu.supabase.co/storage/v1/object/public/stickers/modern-001.png',
    posX: '34.92537313432836',
    posY: '23.833333333333332',
    width: 162,
    height: 162,
    stickerImageId: 'modern-001.png',
    rotation: 0,
  },
  {
    id: `${crypto.randomUUID()}-floral-002.svg`,
    url: 'https://llgxyrndifqzbvolykbu.supabase.co/storage/v1/object/public/stickers/floral-002.svg',
    posX: '46.421062691131496',
    posY: '39.666666666666664',
    width: 93,
    height: 87,
    stickerImageId: 'floral-002.svg',
    rotation: 0,
  },
];
