export const QUERY_KEYS = {
  guestBook: (invitationId: string) => ['guestbook', invitationId] as const,
  invitation: () => ['invitation'] as const,
  stickerImages: () => ['stickerImages'],
  invitationCard: () => ['invitationCard'],
  authUsers: () => ['authUsers'],
  allImageReviews: () => ['allImageReviews'],
};
