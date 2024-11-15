import browserClient from './supabase/client';
import { isEqual } from 'lodash';

import { extractOrderAndType } from '@/constants/invitaionDefaultValue';

const DEFAULT_VALUE = {
  bg_color: { r: 255, g: 255, b: 255, a: 1, name: '흰색' },
  personal_info: {
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
      { bank: '', accountNumber: '', depositor: '', kakaopay: '' },
      { bank: '', accountNumber: '', depositor: '', kakaopay: '' },
      { bank: '', accountNumber: '', depositor: '', kakaopay: '' },
    ],
    groom: [
      { bank: '', accountNumber: '', depositor: '', kakaopay: '' },
      { bank: '', accountNumber: '', depositor: '', kakaopay: '' },
      { bank: '', accountNumber: '', depositor: '', kakaopay: '' },
    ],
  },
  guestbook: true,
  attendance: false,
  wedding_info: {
    date: '2024.11.22',
    time: { hour: '오전 00', minute: '00' },
    weddingHallAddress: '',
    weddingHallName: '',
    weddingHallContact: '',
  },
  main_photo_info: {
    leftName: '',
    rightName: '',
    icon: '♥︎',
    introduceContent: '',
    imageUrl: '',
  },
  navigation_detail: {
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
  mood_preset: {
    mood: 'classic',
    preset: {
      name: 'preset1',
      label: '프리셋 1',
      image: '/assets/images/presets/classicPreset1.svg',
    },
  },
  stickers: [],
  img_ratio: {
    ratio: '',
    position: 0,
  },
  greeting_message: {
    title: '',
    content: '',
  },
  d_day: true,
  main_view: {
    name: '기본',
    type: 'default',
  },
  isPrivate: false,
  render_order: extractOrderAndType(),
  font_info: {
    size: 0,
    fontName: 'Main',
    color: {
      r: 0,
      g: 0,
      b: 0,
      a: 100,
      name: '커스텀',
    },
  },
};

function deepSort(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(deepSort);
  }

  if (value && typeof value === 'object' && value.constructor === Object) {
    const sortedObj: Record<string, unknown> = {};
    Object.keys(value)
      .sort()
      .forEach((key) => {
        sortedObj[key] = deepSort((value as Record<string, unknown>)[key]);
      });

    return sortedObj;
  }

  return value;
}

function deepEquals(target1: unknown, target2: unknown): boolean {
  if (target1 === undefined) {
    return target1 === target2;
  }
  const sortedTarget1 = deepSort(target1);
  const sortedTarget2 = deepSort(target2);

  return isEqual(sortedTarget1, sortedTarget2);
}

export const fetchInvitationFields = async (id: string) => {
  const { data } = await browserClient.from('invitation').select('*').eq('user_id', id);

  return data?.[0];
};

const calculateProgress = (supabaseData: Record<string, unknown>, defaultValue: Record<string, unknown>): number => {
  let completedFields = 0;

  const fieldsToCheck = [
    'personal_info',
    'account',
    'wedding_info',
    'main_photo_info',
    'navigation_detail',
    'gallery',
    'greeting_message',
    'font_info',
  ];

  for (const field of fieldsToCheck) {
    const fieldData = supabaseData?.[field];
    const defaultFieldData = defaultValue?.[field];

    if (!deepEquals(fieldData, defaultFieldData)) {
      completedFields += 1;
    }
  }

  const totalFields = fieldsToCheck.length;

  const progressPercentage = Math.min(Math.round((completedFields / totalFields) * 100), 100);

  return progressPercentage;
};

export const calculateProgressPercentage = async (id: string): Promise<number> => {
  const supabaseData = await fetchInvitationFields(id);
  if (!supabaseData) {
    return 0;
  }
  return calculateProgress(supabaseData, DEFAULT_VALUE);
};
