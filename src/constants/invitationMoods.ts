import { StickerType } from '@/types/invitationFormType.type';

export const MOOD_LIST: { category: string; label: string }[] = [
  { category: 'classic', label: '클래식' },
  { category: 'romantic', label: '로맨틱' },
  { category: 'modern', label: '모던' },
  { category: 'floral', label: '플로럴' },
  { category: 'rustic', label: '러스틱' },
  { category: 'simple', label: '심플' },
];

export const Decorate_Stickers: StickerType[] = [
  {
    id: `${crypto.randomUUID()}-classic-001`,
    url: 'https://llgxyrndifqzbvolykbu.supabase.co/storage/v1/object/public/stickers/classic-001.png',
    posX: '0.29384328358208955',
    posY: '8.666666666666668',
    width: 70,
    height: 70,
    stickerImageId: 'classic-001.png',
  },
  {
    id: `${crypto.randomUUID()}-modern-001`,
    url: 'https://llgxyrndifqzbvolykbu.supabase.co/storage/v1/object/public/stickers/modern-001.png',
    posX: '0',
    posY: '11.5',
    width: 108,
    height: 108,
    stickerImageId: 'modern-001.png',
  },
  {
    id: `${crypto.randomUUID()}-modern-001`,
    url: 'https://llgxyrndifqzbvolykbu.supabase.co/storage/v1/object/public/stickers/modern-001.png',
    posX: '34.92537313432836',
    posY: '23.833333333333332',
    width: 162,
    height: 162,
    stickerImageId: 'modern-001.png',
  },
];
