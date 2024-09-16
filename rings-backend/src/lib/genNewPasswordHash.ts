import { hash } from 'bcrypt';

export const genNewPasswordHash = (newPassword: string) => {
  const saltRounds = 10;
  const passwordHash = hash(newPassword, saltRounds);

  return passwordHash;
};
