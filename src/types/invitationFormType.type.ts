import { AccountInfoType } from './accountType.type';

type PersonalType = {
  name: string;
  phoneNumber: string;
  fatherName: string;
  fatherPhoneNumber: string;
  isFatherDeceased: boolean;
  motherName: string;
  motherPhoneNumber: string;
  isMotherDeceased: boolean;
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
  car: string;
  subway: string;
  bus: string;
};

type GalleryType = {
  images: File[];
};

type ImageRatioType = {
  ratio: string;
  position: number;
};

type GreetingMessageType = {
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
export type InvitationFormType = {
  gallery: GalleryType;
  type: 'scroll' | 'slide';
  mood: string;
  mainView: string;
  bgColor: ColorType;
  stickers: File[];
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
};
