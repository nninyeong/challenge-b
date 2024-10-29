import { z } from "zod";

export const guestBookSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
  content: z.string().min(1, '축하메세지를 입력해주세요.').max(60, '축하메세지는 최대 60자까지 입력 가능합니다.'),
});