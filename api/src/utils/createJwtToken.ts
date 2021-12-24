import jwt from 'jsonwebtoken';

import { User, UserRole } from '../entity/User';
interface JwtPayload {
  id: number|undefined;
  username: string|undefined;
  email: string|undefined;
  role: UserRole|undefined;
  created_at: Date|undefined;
}
export const createJwtToken = (payload: JwtPayload): any => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};