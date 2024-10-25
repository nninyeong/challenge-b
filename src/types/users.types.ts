type UserMetadata = {
  name: string;
  avatar_url: string;
};

export type User = {
  id: string;
  user_metadata: UserMetadata;
};

export type UsersResponse = {
  users: User[];
};
