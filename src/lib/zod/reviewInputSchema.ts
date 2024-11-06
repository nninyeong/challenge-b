import { z } from 'zod';

export const reviewInputSchema = z.object({
  content: z
    .string()
    .min(1, {
      message: '리뷰를 입력해주세요.',
    })
    .max(200),
  images: z.array(z.string().nullable()).max(5, '이미지는 5개까지 업로드할 수 있습니다.').optional(),
});
