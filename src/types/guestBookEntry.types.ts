export type GuestBookEntry = {
  content: string | null;
  created_at: string;
  guestbook_id: string;
  invitation_id: string;
  name: string | null;
  password: string | null;
};