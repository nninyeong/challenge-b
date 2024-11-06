export const maskIdLastFour = (email: string) => {
  const id = email.split('@')[0];
  if (id.length <= 4) return '*'.repeat(id.length);
  const visiblePart = id.slice(0, -4);
  const maskedPart = '*'.repeat(4);
  return visiblePart + maskedPart;
};
