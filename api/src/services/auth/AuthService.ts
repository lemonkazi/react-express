import { APIGatewayEvent } from 'aws-lambda';
import { EntityManager } from 'typeorm';
import UserDao from '../../dao/user/UserDao';
import { User, UserRole } from '../../entity/User';
import BaseService from '../BaseService';
import * as Response from '../../lib/response/response';
//import { JwtPayload } from '../../types/JwtPayload';
//import { createJwtToken } from 'utils/createJwtToken';


interface LoginPostBody {
    email: string;
    password: string;
}

interface UserPutBody {
    role: UserRole;
    username: string;
    password: string;
}

interface MyObj {
  message: string,
  success: Boolean,
  data:object
}

interface JwtPayload {
  id: number|undefined;
  username: string|undefined;
  email: string|undefined;
  role: UserRole|undefined;
  created_at: Date|undefined;
}

export interface UserGetParams {
    email: string;
}


export default class AuthService extends BaseService {
    
    public async _login(requestBody: LoginPostBody, email: string,MyObj:MyObj,JwtPayload:JwtPayload): Promise<any> {
        return this.transaction(async (manager: EntityManager) => {
            //const userDao = new UserDao(manager);
            
            //const userRepository = new UserDao(manager);
            const { email, password } = requestBody;
            //const userRepository = getRepository(User);

            try {

              const userDao = new UserDao(manager);
              const user = await userDao.findByEmail(email);

              if (!user) {
                return Promise.reject({ message: 'User not exist with this email',success: false });
              }

              if (!user.checkIfPasswordMatch(password)) {
                return Promise.reject({ message: 'Incorrect email or password',success: false });
                
              }

             

              

              
              //return data = { message: 'succeed',success: true, body:user} ;
              const jwtPayload: JwtPayload = {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                created_at: user.created_at,
              };
              const recipient: MyObj = { message: 'succeed',success: true,data:jwtPayload };
              
              
              return Promise.resolve(recipient);

              // try {
              //   const token = createJwtToken(jwtPayload);
              //   res.customSuccess(200, 'Token successfully created.', `Bearer ${token}`);
              // } catch (err) {
              //   const customError = new CustomError(400, 'Raw', "Token can't be created", null, err);
              //   return next(customError);
              // }
          } catch (e) {
            console.log(e);
            return Promise.reject({ message: 'Failed to login',success: false });
              // return Promise.reject({
              //     message: `Couldnt connect to database: ${e} with params
              // ${JSON.stringify({
              //     port: dbConfig.port,
              //     username: dbConfig.username,
              //     database: dbConfig.database,
              // })}`,
              // });
          }
        });
    }

 
}
