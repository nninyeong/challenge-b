import { UseFormReset } from 'react-hook-form';
import { convertToCamelCase } from '../convert/invitaitonTypeConvert';
import { Invitation } from '@/types/database.type';
import { InvitationFormType } from '@/types/invitationFormType.type';

type LoadFormDataProps = {
  existingInvitation: Invitation;
  reset: UseFormReset<InvitationFormType>;
};
export const loadFormData = async ({ existingInvitation, reset }: LoadFormDataProps) => {
  if (existingInvitation) {
    const convertedInvitation = convertToCamelCase(existingInvitation);
    return reset(convertedInvitation);
  }
  const sessionData = sessionStorage.getItem('invitationFormData');
  if (sessionData) {
    return reset(JSON.parse(sessionData));
  }
  reset();
};
