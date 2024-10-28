import { z } from 'zod';
import { signInSchema, signUpSchema } from '@/lib/zod/authSchema';
import { guestBookSchema } from '@/lib/zod/guestBookSchema';
import { attendanceSchema } from '@/lib/zod/attendanceSchema';

export type SignUpFormValues = z.infer<typeof signUpSchema>;
export type SignInFormValues = z.infer<typeof signInSchema>;
export type GuestBookFormData = z.infer<typeof guestBookSchema>;
export type FormData = z.infer<typeof attendanceSchema>;