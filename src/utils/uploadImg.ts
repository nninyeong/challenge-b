import { supabase } from './supabase/createClient';
import { generateUniqueFile } from './uniqueFile';

export const uploadImageToSupabaseStorage = async (file: File) => {
  const fileName = generateUniqueFile();
  const { data, error } = await supabase.storage.from('invitation').upload(`/main_img/${fileName}`, file);

  if (error) return console.error('대표사진 업로드를 실패하였습니다.', error);

  const { data: urlData } = supabase.storage.from('invitation').getPublicUrl(data.path);

  return urlData.publicUrl;
};

export const uploadGalleryImageToSupabaseStorage = async (file: File) => {
  const fileName = generateUniqueFile();

  const { data, error } = await supabase.storage.from('invitation').upload(`/gallery/${fileName}`, file);

  if (error) return console.error('갤러리 업로드를 실패하였습니다.', error);

  const { data: urlData } = supabase.storage.from('invitation').getPublicUrl(data.path);
  return urlData.publicUrl as unknown as string;
};

export const deleteGalleryImageFromSupabase = async (url: string) => {
  const getPathFromUrl = (url: string) => {
    const match = url.match(/\/invitation\/(.*)$/);
    return match ? match[1] : '';
  };

  const path = getPathFromUrl(url);

  if (!path) {
    console.error('유효하지 않은 URL입니다.', url);
    throw new Error('유효하지 않은 URL입니다.');
  }

  const { error } = await supabase.storage.from('invitation').remove([path]);
  if (error) {
    console.error('이미지 삭제에 실패했습니다.', error);
    throw new Error('이미지 삭제 오류');
  }

  return url;
};
