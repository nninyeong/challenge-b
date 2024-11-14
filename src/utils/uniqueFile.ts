export const generateUniqueFile = () => {
  return `file_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
};
