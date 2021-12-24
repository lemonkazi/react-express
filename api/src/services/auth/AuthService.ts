import { APIGatewayEvent } from 'aws-lambda';
import { EntityManager } from 'typeorm';
import UserDao from '../../dao/user/UserDao';
import { User, UserRole } from '../../entity/User';
import BaseService from '../BaseService';
import * as Response from '../../lib/response/response';


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

export interface UserGetParams {
    email: string;
}


export default class AuthService extends BaseService {
    
    public async _login(requestBody: LoginPostBody, email: string,MyObj:MyObj): Promise<any> {
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

             

              const recipient: MyObj = { message: 'succeed',success: true,data:user };
              return Promise.resolve(recipient);
              

              
              //return data = { message: 'succeed',success: true, body:user} ;
              // const jwtPayload: JwtPayload = {
              //   id: user.id,
              //   name: user.name,
              //   email: user.email,
              //   role: user.role as Role,
              //   created_at: user.created_at,
              // };

              // try {
              //   const token = createJwtToken(jwtPayload);
              //   res.customSuccess(200, 'Token successfully created.', `Bearer ${token}`);
              // } catch (err) {
              //   const customError = new CustomError(400, 'Raw', "Token can't be created", null, err);
              //   return next(customError);
              // }
          } catch (e) {
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
