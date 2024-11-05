export const QUERY_KEYS = {
  guestBook: (invitationId: string, page: number) => ['guestbook', invitationId, page] as const,
  invitation: () => ['invitation'] as const,
  stickerImages: () => ['stickerImages'],
  invitationCard: () => ['invitationCard'],
  reviewCarousel: () => ['reviewCarousel'],
  authUsers: () => ['authUsers'],
  allImageReviews: () => ['allImageReviews'],
  reviews: () => ['reviews'],
  userReview: () => ['userReview'],
};
