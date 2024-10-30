import { SupabaseClient } from '@supabase/supabase-js';
import { convertToSnakeCase } from '../convert/invitaitonTypeConvert';

export const saveSessionDataToSupabase = async (client: SupabaseClient, userId: string) => {
  const sessionData = sessionStorage.getItem('invitationFormData');

  if (!sessionData) return;

  const parsedData = JSON.parse(sessionData);
  const convertedData = {
    ...convertToSnakeCase(parsedData),
    user_id: userId,
  };

  const { data: existingData } = await client.from('invitation').select('user_id').eq('user_id', userId).maybeSingle();

  if (!existingData) {
    const { error } = await client.from('invitation').insert(convertedData);

    if (error) {
      console.error(error);
    }
  }
  sessionStorage.removeItem('invitationFormData');
};
