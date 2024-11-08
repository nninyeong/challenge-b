import { usePathname } from 'next/navigation';

const SAMPLE_GUESTBOOK_ID = 'ce7fe66a-0734-4314-9bd3-6fd8662621db';
const useInvitationIdByPathname = () => {
  const path = usePathname();
  const isCreate = path === '/create/card';
  const invitationId = isCreate ? SAMPLE_GUESTBOOK_ID : path.split('/')[2];

  return { isCreate, invitationId };
};

export default useInvitationIdByPathname as typeof useInvitationIdByPathname;
