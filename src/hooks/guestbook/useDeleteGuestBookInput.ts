import { useState } from 'react';
import useDeleteGuestBookEntry from './useDeleteGuestBookEntry';
import { Notify } from 'notiflix';

const useDeleteGuestBookInput = (
  invitationId: string,
  id: string | null,
  signedPassword: string | null,
  onClose: () => void,
) => {
  const [password, setPassword] = useState('');
  const { mutate: deleteGuestBookEntry } = useDeleteGuestBookEntry(invitationId, id, signedPassword, onClose);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleGuestBookDelete = (e: React.FormEvent) => {
    e.preventDefault();

    if (!password.trim()) {
      Notify.failure('패스워드를 입력해주세요.');
      return;
    }

    deleteGuestBookEntry(password);
  };

  return {
    password,
    handlePasswordChange,
    handleGuestBookDelete,
  };
};

export default useDeleteGuestBookInput;
