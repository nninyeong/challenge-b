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
};

export type NavigationDetailType = {
  map: boolean;
  navigationButton: boolean;
  car: string;
  subway: string;
  bus: string;
};

export type InvitationFormType = {
  gallery: any;
  type: any;
  mood: any;
  mainView: any;
  bgColor: any;
  stickers: any;
  imgRatio: any;
  mainText: any;
  personalInfo: PersonalInfoType;
  greetingMessage: any;
  weddingInfo: WeddingInfoType;
  account: AccountInfoType;
  navigationDetail: NavigationDetailType;
  guestbook: boolean;
  attendance: boolean;
  dDay: boolean;
  mainPhotoInfo: MainPhotoType;
};
