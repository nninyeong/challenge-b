import { z } from 'zod';

export const kakaopaySchema = z.union([
  z.literal(''),
  z.string().url().refine((value) => value.startsWith('https://qr.kakaopay.com'), {
    message: '카카오페이 주소 형식이 아닙니다',
  }),
]);