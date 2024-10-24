import { AccountInfoType } from './accountType.type';

type PersonalInfoType = {
  groomName: string;
  groomPhone: string;
  groomFatherName: string;
  groomFatherPhone: string;
  groomFatherAlive: boolean;
  groomMotherName: string;
  groomMotherPhone: string;
  groomMotherAlive: boolean;
  brideName: string;
  bridePhone: string;
  brideFatherName: string;
  brideFatherPhone: string;
  brideFatherAlive: boolean;
  brideMotherName: string;
  brideMotherPhone: string;
  brideMotherAlive: boolean;
};

type WeddingInfoType = {
  date: string;
  time: { hour: string; minute: string };
  weddingHallAddress: string;
  weddingHallName: string;
  weddingHallContact: string;
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
