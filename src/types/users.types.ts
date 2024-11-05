type UserMetadata = {
  name: string;
  avatar_url: string;
  email: string;
  email_verified: boolean;
  full_name: string;
  iss: string;
  phone_verified: boolean;
  picture: string;
  provider_id: string;
  sub: string;
};

export type User = {
  id: string;
  user_metadata: UserMetadata;
};

export type UsersResponse = {
  users: User[];
};
