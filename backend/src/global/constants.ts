export const cacheKeys = {
  users: (): string => "users",
  user: (userId: number): string => `user_${userId}`,
  rings: (userId: number): string => `rings_user_${userId}`,
  ring: (ringId: number, userId: number): string =>
    `ring_${ringId}_user_${userId}`,
};
