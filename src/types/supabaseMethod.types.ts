import { AuthUser } from '@supabase/supabase-js';

// auth.getUser() 반환 타입
export type UserData = { data: { user: AuthUser | null } };
