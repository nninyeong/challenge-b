import { AccountInfoType } from './accountType.type';

export type ParentType = {
  name: string;
  relation: string;
  phoneNumber: string;
  isDeceased: boolean;
};

export type PersonalType = {
  name: string;
  relation: string;
  phoneNumber: string;
  father: ParentType;
  mother: ParentType;
};

export type PersonalInfoType = {
  bride: PersonalType;
  groom: PersonalType;
};

export type WeddingInfoType = {
  date: string;
  time: { hour: string; minute: string };
  weddingHallAddress: string;
  weddingHallName: string;
  weddingHallContact: string;
};

export type MainPhotoType = {
  leftName: string;
  rightName: string;
  icon: string;
  introduceContent: string;
  imageUrl: string;
  fontName: string;
};

export type NavigationDetailType = {
  map: boolean;
  navigationButton: boolean;
  subway: string;
  bus: string;
};

export type GalleryType = {
  images: string[];
  grid: number;
  ratio: string;
};

export type ImageRatioType = {
  ratio: string;
  position: number;
};

export type GreetingMessageType = {
  title: string;
  content: string;
};
export type ColorType = {
  r: number;
  g: number;
  b: number;
  a: number;
  name: string;
};

export type StickerType = {
  id: string;
  stickerImageId: string;
  url: string;
  posX: string;
  posY: string;
  width: number;
  height: number;
  rotation: number;
};

export type DecorateImageType = {
  name: string;
  type: string;
};

export type MoodPresetType = {
  mood: Mood;
  preset: Preset;
};

export type OrderItem = {
  order: number;
  typeOnSharedCard:
    | 'MAIN_PHOTO'
    | 'GREETING'
    | 'PERSONAL_INFO'
    | 'ACCOUNT'
    | 'WEDDING_INFO'
    | 'NAVIGATION_DETAILS'
    | 'GUEST_INFO'
    | 'GALLERY'
    | 'ONLY_FOR_CREATE';
  labelForInput: string;
};

export type Mood = 'classic' | 'romantic' | 'modern' | 'floral' | 'rustic' | 'simple' | 'none';
export type Preset = 'preset1' | 'preset2' | 'preset3';

export type InvitationFormType = {
  gallery: GalleryType;
  type: 'scroll' | 'slide';
  moodPreset: MoodPresetType;
  mainView: DecorateImageType;
  bgColor: ColorType;
  stickers: StickerType[];
  imgRatio: ImageRatioType;
  mainText: string;
  personalInfo: PersonalInfoType;
  greetingMessage: GreetingMessageType;
  weddingInfo: WeddingInfoType;
  account: AccountInfoType;
  navigationDetail: NavigationDetailType;
  guestbook: boolean;
  attendance: boolean;
  dDay: boolean;
  mainPhotoInfo: MainPhotoType;
  isPrivate: boolean;
  renderOrder: OrderItem[];
};

export type InvitationCard = {
  main_photo_info: {
    imageUrl: string;
  };
  isPrivate: boolean;
  id: string;
  greeting_message: {
    title: string;
    content: string;
  };
};
