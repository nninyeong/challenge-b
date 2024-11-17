import { FileObject } from '@supabase/storage-js';

export const validateStorageFiles = (data: FileObject[] | null) =>
  data?.filter((file) => file.name !== '.emptyFolderPlaceholder') || [];
