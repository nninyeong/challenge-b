export const revalidateInvitation = async (invitationId: string) => {
  const response = await fetch(`/api/revalidate/${invitationId}`);
  const data = await response.json();

  if (response.ok) {
    console.log('업데이트 성공');
  } else {
    return console.log(data.message || '업데이트 실패');
  }
};
