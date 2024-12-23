import { guestBookSchema } from '@/lib/zod/guestBookSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useAddGuestBookEntry from '../queries/guestbook/useCreateGuestBookEntry';
import { GuestBookFormData } from '@/types/guestInfo.types';
import { Notify } from 'notiflix';

const useCreateGuestBookInput = (invitationId: string, isCreatePage: boolean, goOnePage: () => void, totalPages: number) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GuestBookFormData>({
    resolver: zodResolver(guestBookSchema),
  });

  const { mutate: addGuestBookEntry } = useAddGuestBookEntry({
    invitationId,
    onSuccess: () => {
      reset();
      goOnePage();
    },
    totalPages
  });

  const onSubmit = handleSubmit((data) => {
    if (isCreatePage) {
      Notify.info('제작페이지에서는 작성하실 수 없습니다.');
      return;
    }

    addGuestBookEntry(data);
  });

  return {
    register,
    onSubmit,
    errors,
  };
};

export default useCreateGuestBookInput;
