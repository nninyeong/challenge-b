import { InvitationFormType } from '@/types/invitationFormType.type';
import { INITIAL_ORDER } from '@/constants/invitationViewOrder';

const extractOrderAndType = () => {
  return INITIAL_ORDER().map(({ order, typeOnSharedCard, labelForInput }) => ({
    order,
    typeOnSharedCard,
    labelForInput,
  }));
};

export const INVITATION_DEFAULT_VALUE: InvitationFormType = {
  bgColor: { r: 255, g: 255, b: 255, a: 1, name: '흰색' },
  personalInfo: {
    bride: {
      name: '',
      relation: '',
      phoneNumber: '',
      father: { name: '', relation: '', phoneNumber: '', isDeceased: false },
      mother: { name: '', relation: '', phoneNumber: '', isDeceased: false },
    },
    groom: {
      name: '',
      relation: '',
      phoneNumber: '',
      father: { name: '', relation: '', phoneNumber: '', isDeceased: false },
      mother: { name: '', relation: '', phoneNumber: '', isDeceased: false },
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
  gallery: {
    images: [],
    grid: 3,
    ratio: 'square',
  },
  type: 'scroll',
  moodPreset: {
    mood: 'classic',
    preset: {
      name: 'preset1',
      label: '프리셋 1',
      image: '/assets/images/presets/classicPreset1.svg',
    },
  },
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
  isPrivate: false,
  renderOrder: extractOrderAndType(),
};
