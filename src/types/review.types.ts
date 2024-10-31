export type Review = {
  id: string;
  user_name: string;
  created_at: string;
  content: string;
  image_url: string[];
  user_id: string;
};

export type ReviewResponse = {
  reviews: Review[];
  nextPageToken?: number;
};
