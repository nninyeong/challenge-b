import { guestBookSchema } from '@/lib/zod/guestBookSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useAddGuestBookEntry from './useCreateGuestBookEntry';
import { GuestBookFormData } from '@/types/auth.types';

const useCreateGuestBookInput = (invitationId: string) => {
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
    addGuestBookEntry(data);
  });

  return {
    register,
    onSubmit,
    errors,
  };
};

export default useCreateGuestBookInput;
