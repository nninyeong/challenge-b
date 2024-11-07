import { z } from 'zod';

export const validationSchema = z.object({
  bgColor: z.object({
    r: z.number(),
    g: z.number(),
    b: z.number(),
    a: z.number(),
    name: z.string(),
  }),
  personalInfo: z.object({
    bride: z.object({
      name: z.string().max(5, '이름은 최대 5자까지 입력 가능합니다.').nullable(),
      relation: z.string().max(5, '관계는 최대 5자까지 입력 가능합니다.').nullable(),
      phoneNumber: z.string().max(15, '전화번호는 최대 15자까지 입력 가능합니다.').nullable(),
      father: z.object({
        name: z.string().max(5, '이름은 최대 5자까지 입력 가능합니다.').nullable(),
        relation: z.string().max(5, '관계는 최대 5자까지 입력 가능합니다.').nullable(),
        phoneNumber: z.string().max(15, '전화번호는 최대 15자까지 입력 가능합니다.').nullable(),
        isDeceased: z.boolean(),
      }),
      mother: z.object({
        name: z.string().max(5, '이름은 최대 5자까지 입력 가능합니다.').nullable(),
        relation: z.string().max(5, '관계는 최대 5자까지 입력 가능합니다.').nullable(),
        phoneNumber: z.string().max(15, '전화번호는 최대 15자까지 입력 가능합니다.').nullable(),
        isDeceased: z.boolean(),
      }),
    }),
    groom: z.object({
      name: z.string().max(5, '이름은 최대 5자까지 입력 가능합니다.').nullable(),
      relation: z.string().max(5, '관계는 최대 5자까지 입력 가능합니다.').nullable(),
      phoneNumber: z.string().max(15, '전화번호는 최대 15자까지 입력 가능합니다.').nullable(),
      father: z.object({
        name: z.string().max(5, '이름은 최대 5자까지 입력 가능합니다.').nullable(),
        relation: z.string().max(5, '관계는 최대 5자까지 입력 가능합니다.').nullable(),
        phoneNumber: z.string().max(15, '전화번호는 최대 15자까지 입력 가능합니다.').nullable(),
        isDeceased: z.boolean(),
      }),
      mother: z.object({
        name: z.string().max(5, '이름은 최대 5자까지 입력 가능합니다.').nullable(),
        relation: z.string().max(5, '관계는 최대 5자까지 입력 가능합니다.').nullable(),
        phoneNumber: z.string().max(15, '전화번호는 최대 15자까지 입력 가능합니다.').nullable(),
        isDeceased: z.boolean(),
      }),
    }),
  }),
  account: z.object({
    title: z.string().max(20, '제목은 최대 20자까지 입력 가능합니다.').nullable(),
    content: z.string().max(20, '계좌 설명은 최대 20자까지 입력 가능합니다.').nullable(),
    bride: z
      .array(
        z.object({
          bank: z.string().max(9, '은행 이름은 최대 9자까지 입력 가능합니다.').nullable(),
          accountNumber: z.string().max(27, '계좌 번호는 최대 27자까지 입력 가능합니다.').nullable(),
          depositor: z.string().max(5, '예금주는 최대 5자까지 입력 가능합니다.').nullable(),
        }),
      )
      .length(3),
    groom: z
      .array(
        z.object({
          bank: z.string().max(9, '은행 이름은 최대 9자까지 입력 가능합니다.').nullable(),
          accountNumber: z.string().max(27, '계좌 번호는 최대 27자까지 입력 가능합니다.').nullable(),
          depositor: z.string().max(5, '예금주는 최대 5자까지 입력 가능합니다.').nullable(),
        }),
      )
      .length(3),
  }),
  guestbook: z.boolean(),
  attendance: z.boolean(),
  weddingInfo: z.object({
    date: z
      .string()
      .regex(/^\d{4}\.\d{2}\.\d{2}$/, '예식 날짜는 xxxx.xx.xx 형식에 맞춰야 합니다.')
      .nullable(),
    time: z.object({ hour: z.string().nullable(), minute: z.string().nullable() }),
    weddingHallAddress: z.string().nullable(),
    weddingHallName: z.string().max(21, '예식장 이름은 최대 21자까지 입력 가능합니다.').nullable(),
    weddingHallContact: z.string().max(15, '예식장 전화번호는 최대 15자까지 입력 가능합니다.').nullable(),
  }),
  mainPhotoInfo: z.object({
    leftName: z.string().max(5, '이름은 최대 5자까지 입력 가능합니다.').nullable(),
    rightName: z.string().max(5, '이름은 최대 5자까지 입력 가능합니다.').nullable(),
    icon: z.string().max(1, '아이콘은 최대 1자까지 입력 가능합니다.').nullable(),
    introduceContent: z.string(),
    imageUrl: z.string().nullable(),
    fontName: z.string().nullable(),
  }),
  navigationDetail: z.object({
    map: z.boolean(),
    navigationButton: z.boolean(),
    subway: z.string().max(70, '지하철 교통 정보는 최대 70자까지 입력 가능합니다.').nullable(),
    bus: z.string().max(70, '버스 교통 정보는 최대 70자까지 입력 가능합니다.').nullable(),
  }),
  gallery: z.object({
    images: z.array(z.any()).nullable(),
    grid: z.number(),
    ratio: z.string(),
  }),
  type: z.enum(['scroll', 'slide']),
  moodPreset: z.object({
    mood: z.string(),
    preset: z.object({
      name: z.string(),
      label: z.string(),
      image: z.any(),
    }),
  }),
  stickers: z.array(z.any()).nullable(),
  imgRatio: z.object({
    ratio: z.string(),
    position: z.number(),
  }),
  mainText: z.string().default(''),
  greetingMessage: z.object({
    title: z.string().max(20, '인사말 제목은 최대 20자까지 입력 가능합니다.').nullable(),
    content: z.string(),
  }),
  dDay: z.boolean().default(true),
  mainView: z.object({
    name: z.string(),
    type: z.string(),
  }),
  isPrivate: z.boolean().default(false),
  renderOrder: z.any(),
});

export type validationFormType = z.infer<typeof validationSchema>;
