'use client';

import useDeleteGuestBookInput from '@/hooks/guestbook/useDeleteGuestBookInput';

const DeleteGuestBookAccordion = ({
  invitationId,
  id,
  signedPassword,
  onClose,
}: {
  invitationId: string;
  id: string | null;
  signedPassword: string | null;
  onClose: () => void;
}) => {
  const { password, handlePasswordChange, handleGuestBookDelete } = useDeleteGuestBookInput(
    invitationId,
    id,
    signedPassword,
    onClose,
  );

  return (
    <div className='px-4 bg-white text-black mt-2'>
      <form onSubmit={handleGuestBookDelete}>
        <input
          type='password'
          className='border-gray-500 border outline-none p-1 w-full mb-2'
          value={password}
          placeholder='비밀번호를 입력하세요.'
          onChange={handlePasswordChange}
        />
        <button
          className='w-full mb-2'
          type='submit'
        >
          삭제하기
        </button>
      </form>
    </div>
  );
};

export default DeleteGuestBookAccordion;
