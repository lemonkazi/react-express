
export type JwtPayload = {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  created_at: Date;
};
