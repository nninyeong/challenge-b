import { guestBookSchema } from '@/lib/zod/guestBookSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useAddGuestBookEntry from './useCreateGuestBookEntry';
import { GuestBookFormData } from '@/types/guestInfo.types';
import { Notify } from 'notiflix';

const useCreateGuestBookInput = (invitationId: string, isCreate: boolean) => {
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
    onSuccess: () => reset(),
  });

  const onSubmit = handleSubmit((data) => {
    if (isCreate) {
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
