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
  guestbook: true,
  attendance: false,
  weddingInfo: {
    date: '2024.11.22',
    time: { hour: '오전 00', minute: '00' },
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
  dDay: true,
  mainView: {
    name: '기본',
    type: 'default',
  },
  isPrivate: false,
  renderOrder: extractOrderAndType(),
  fontInfo: {
    size: 0,
    fontName: 'main',
    color: {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
      name: '커스텀',
    },
  },
};
