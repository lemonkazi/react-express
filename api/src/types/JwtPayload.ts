export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  SUPER_ADMIN = 'superAdmin',
}

export type JwtPayload = {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  created_at: Date;
};
