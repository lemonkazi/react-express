import { Request, Response, NextFunction } from 'express';

import { Role,usrRole } from '../entity/types';
// enum Role {
//   USER = 'user',
//   ADMIN = 'admin',
//   ADMINISTRATOR = 'superAdmin',
// }
// export type Role = 'ADMINISTRATOR' | 'STANDARD';

export interface RoleType {
  role: any
}

interface CheckRole {
  headers?: any|undefined,
  queryStringParameters?:any|undefined,
}

import { CustomError } from '../utils/response/custom-error/CustomError';

export const checkUserRole = (roles: Role, isSelfAllowed = false,req: CheckRole,jwtPayload:any) => {
  
  //return async (req: Request, res: Response, next: NextFunction) => {
    
    const { id, role } = jwtPayload;
    const { id: requestId } = req.queryStringParameters;
    
    console.log('dddddddddddddd');
    console.log(roles);
    console.log('dddddddddddddd') 
    let errorSelfAllowed: string | null = null;
    if (isSelfAllowed) {
      if (id === parseInt(requestId)) {
        return;
      }
      errorSelfAllowed = 'Self allowed action.';
    }

    //var usrrRole = ['ADMINISTRATOR','USER','ADMIN'];
    

    
    

    if (role === '' || !inArray(roles, usrRole)) {
      const errors = [
        'Unauthorized - Insufficient user rights',
        `Current role: ${role}. Required role: ${roles.toString()}`,
      ];
      if (errorSelfAllowed) {
        errors.push(errorSelfAllowed);
      }

      let customError = {
        httpStatusCode: 401,
        errorType: 'Unauthorized',
        message: 'Unauthorized - Insufficient user rights',
        errors:errors
      }
      //const customError = new CustomError(400, 'General', 'Authorization header not provided');
      
      return customError;
      //const customError = new CustomError(401, 'Unauthorized', 'Unauthorized - Insufficient user rights', errors);
      //return next(customError);
    }
    // return next();
  //};
};


function arrayCompare(a1:any, a2:any) {
  if (a1.length != a2.length) return false;
  var length = a2.length;
  for (var i = 0; i < length; i++) {
      if (a1[i] !== a2[i]) return false;
  }
  return true;
}

function inArray(needle:any, haystack:any) {
  var length = haystack.length;
  for(var i = 0; i < length; i++) {
      if(typeof haystack[i] == 'object') {
          if(arrayCompare(haystack[i], needle)) return true;
      } else {
          if(haystack[i] == needle) return true;
      }
  }
  return false;
}
