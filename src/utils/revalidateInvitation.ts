export const revalidateInvitation = async (invitationId: string) => {
  const response = await fetch(`/api/revalidate?id=${invitationId}`);
  const data = await response.json();

  if (response.ok) return { isSuccess: true };

  if (!response.ok) {
    console.error(data.message || '업데이트 실패');
    throw new Error(data.message);
  }

  return { isSuccess: false };
};
