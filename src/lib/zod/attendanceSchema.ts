import { z } from 'zod';

export const attendanceSchema = z.object({
  personType: z.string().min(1, '구분을 선택해주세요.'),
  mealOption: z.string().min(1, '식사 여부를 선택해주세요.'),
  name: z.string().min(1, '이름을 입력해주세요.'),
  attendanceCount: z.number().min(0, '0 이상 입력해야 합니다.').max(100, '100 이하로 입력해야 합니다.').nullable(),
});
