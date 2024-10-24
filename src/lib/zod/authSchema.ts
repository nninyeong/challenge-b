import { z } from 'zod';

export const signUpSchema = z
  .object({
    email: z.string().email('유효한 이메일 형식을 작성해주세요.'),
    password: z.string().min(4, { message: '비밀번호를 확인해주세요.' }),
    passwordCheck: z.string().min(4, { message: '비밀번호를 확인해주세요.' }),
    username: z.string().min(1, { message: '이름을 입력해주세요.' }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordCheck'],
  });

export const signInSchema = z.object({
  email: z.string().email('유효한 이메일 형식을 작성해주세요.'),
  password: z.string().min(4, { message: '비밀번호를 확인해주세요.' }),
});
