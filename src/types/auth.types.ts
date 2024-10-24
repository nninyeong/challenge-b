import { z } from 'zod';
import { signInSchema, signUpSchema } from '@/lib/zod/authSchema';

export type SignUpFormValues = z.infer<typeof signUpSchema>;
export type SignInFormValues = z.infer<typeof signInSchema>;
