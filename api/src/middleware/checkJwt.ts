import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { JwtPayload } from '../types/JwtPayload';
import { createJwtToken } from '../utils/createJwtToken';
import { CustomError } from '../utils/response/custom-error/CustomError';
interface LoginPostBody {
  authorization?: string|undefined;
}


//export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
export const checkJwt = (req: LoginPostBody): any => {
  
    const authHeader = req.authorization;
    
    if (!authHeader || authHeader=='') {
      let customError = {
        httpStatusCode: 400,
        errorType: 'General',
        message: 'Authorization header not provided',
      }
      //const customError = new CustomError(400, 'General', 'Authorization header not provided');
      
      return customError;
    }
    

    const token = authHeader.split(' ')[1];
    let jwtPayload: { [key: string]: any };
    try {
      return jwtPayload = jwt.verify(token, process.env.JWT_SECRET as string) as { [key: string]: any };
      ['iat', 'exp'].forEach((keyToRemove) => delete jwtPayload[keyToRemove]);
      console.log("ssssssssssss");
                console.log(jwtPayload);
                console.log("ssssssssssss");
      //req.jwtPayload = jwtPayload as JwtPayload;
    } catch (err) {
      // const customError = new CustomError(401, 'Raw', 'JWT error', null, err);
      // return next(customError);
      let customError = {
        httpStatusCode: 401,
        errorType: 'Raw',
        message: 'JWT error',
      }
      //const customError = new CustomError(400, 'General', 'Authorization header not provided');
      
      return customError;
    }

    // try {
    //   // Refresh and send a new token on every request
    //   const newToken = createJwtToken(jwtPayload as JwtPayload);
    //   res.setHeader('token', `Bearer ${newToken}`);
    //   return next();
    // } catch (err) {
    //   const customError = new CustomError(400, 'Raw', "Token can't be created", null, err);
    //   return next(customError);
    // }
};