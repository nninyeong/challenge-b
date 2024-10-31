export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Invitation = {
  account: Json;
  attendance: Json;
  bg_color: Json;
  created_at: string;
  gallery: Json;
  greeting_message: Json;
  guestbook: Json;
  id: string;
  img_ratio?: Json | null;
  main_text: Json;
  main_view: Json;
  mood: Json;
  personal_info: Json;
  stickers?: Json | null;
  type: Json;
  user_id: string;
  wedding_info: Json;
  navigation_detail?: Json | null;

  d_day: Json;
  main_photo_info: Json;
  isPrivate: boolean;
};
