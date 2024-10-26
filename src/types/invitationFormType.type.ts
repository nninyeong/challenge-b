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
  time: { hour: string; minute: string };
  weddingHallAddress: string;
  weddingHallName: string;
  weddingHallContact: string;
};

type NavigationDetailType = {
  map: boolean;
  navigation_button: boolean;
  car: string;
  subway: string;
  bus: string;
}

type Sticker = {
  id: string;
  stickerId: string;
  position: {x: number; y: number};
}

export type InvitationFormType = {
  gallery: any;
  type: any;
  mood: any;
  main_view: any;
  bg_color: any;
  stickers: Sticker[];
  img_ratio: any;
  main_text: any;
  personal_info: PersonalInfoType;
  greeting_message: any;
  wedding_info: WeddingInfoType;
  account: AccountInfoType;
  navigation_detail: NavigationDetailType;
  guestbook: boolean;
  attendance: boolean;
};
