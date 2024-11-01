import { supabase } from './supabase/createClient';

export const uploadImageToSupabaseStorage = async (file: File) => {
  const fileName = `file_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  const { data, error } = await supabase.storage.from('invitation').upload(`/main_img/${fileName}`, file);

  if (error) return console.error('대표사진 업로드를 실패하였습니다.', error);

  const { data: urlData } = supabase.storage.from('invitation').getPublicUrl(data.path);

  return urlData.publicUrl;
};

export const uploadGalleryImageToSupabaseStorage = async (file: File) => {
  const fileName = `file_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;

  const { data, error } = await supabase.storage.from('invitation').upload(`/gallery/${fileName}`, file);

  if (error) return console.error('대표사진 업로드를 실패하였습니다.', error);

  const { data: urlData } = supabase.storage.from('invitation').getPublicUrl(data.path);

  return urlData.publicUrl as unknown as string;
};
