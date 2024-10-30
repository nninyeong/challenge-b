import { InvitationFormType } from '@/types/invitationFormType.type';

export const INVITATION_DEFAULT_VALUE: InvitationFormType = {
  bgColor: { r: 255, g: 255, b: 255, a: 1, name: '흰색' },
  personalInfo: {
    bride: {
      name: '',
      phoneNumber: '',
      fatherName: '',
      fatherPhoneNumber: '',
      isFatherDeceased: false,
      motherName: '',
      motherPhoneNumber: '',
      isMotherDeceased: false,
    },
    groom: {
      name: '',
      phoneNumber: '',
      fatherName: '',
      fatherPhoneNumber: '',
      isFatherDeceased: false,
      motherName: '',
      motherPhoneNumber: '',
      isMotherDeceased: false,
    },
  },
  account: {
    title: '',
    content: '',
    bride: [
      { bank: '', accountNumber: '', depositor: '' },
      { bank: '', accountNumber: '', depositor: '' },
      { bank: '', accountNumber: '', depositor: '' },
    ],
    groom: [
      { bank: '', accountNumber: '', depositor: '' },
      { bank: '', accountNumber: '', depositor: '' },
      { bank: '', accountNumber: '', depositor: '' },
    ],
  },
  guestbook: false,
  attendance: false,
  weddingInfo: {
    date: '',
    time: { hour: '', minute: '' },
    weddingHallAddress: '',
    weddingHallName: '',
    weddingHallContact: '',
  },
  mainPhotoInfo: {
    leftName: '',
    rightName: '',
    icon: '',
    introduceContent: '',
    imageUrl: '',
    fontName: '',
  },
  navigationDetail: {
    map: false,
    navigationButton: false,
    subway: '',
    bus: '',
  },
  gallery: { images: [] },
  type: 'scroll',
  mood: '',
  stickers: [],
  imgRatio: {
    ratio: '',
    position: 0,
  },
  mainText: '',
  greetingMessage: {
    title: '',
    content: '',
  },
  dDay: false,
  mainView: {
    name: '기본',
    type: 'default',
  },
};
