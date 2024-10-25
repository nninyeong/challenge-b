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

type WeddingInfoType = {
  date: string;
  time: { hour: number; minute: number };
  weddingHoleAddress: string;
  weddingHoleName: string;
  weddingHolePhone: string;
};

export type InvitationFormType = {
  gallery: any;
  type: any;
  mood: any;
  main_view: any;
  bg_color: any;
  sticker: any;
  img_ratio: any;
  main_text: any;
  personal_info: PersonalInfoType;
  greeting_message: any;
  wedding_info: WeddingInfoType;
  account: AccountInfoType;
  guestbook: any;
  attendance: any;
};
