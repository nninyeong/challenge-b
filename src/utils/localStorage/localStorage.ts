import { SupabaseClient } from '@supabase/supabase-js';
import { convertToSnakeCase } from '../convert/invitaitonTypeConvert';

export const saveLocalDataToSupabase = async (client: SupabaseClient, userId: string) => {
  const localData = localStorage.getItem('invitationFormData');

  if (!localData) return;

  const parsedData = JSON.parse(localData);
  const convertedData = {
    ...convertToSnakeCase(parsedData),
    user_id: userId,
  };

  const { data: existingData } = await client.from('invitation').select('user_id').eq('user_id', userId).maybeSingle();

  if (existingData) {
    localStorage.removeItem('invitationFormData');
  } else {
    const { error } = await client.from('invitation').insert(convertedData);

    if (error) {
      console.error(error);
    }

    localStorage.removeItem('invitationFormData');
  }
};
