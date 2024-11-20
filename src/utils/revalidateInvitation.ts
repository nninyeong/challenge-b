export const revalidateInvitation = async (invitationId: string) => {
  console.log('revalidateInvitation 실행');
  console.log('revalidate id: ', invitationId);
  const response = await fetch(`/api/revalidate?id=${invitationId}`);
  const result = await response.json();

  if (response.ok) return { isSuccess: true };

  if (!response.ok) {
    console.error(result.message || '업데이트 실패');
    throw new Error(result.message);
  }

  return { isSuccess: false };
};
