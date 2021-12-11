import { EntityManager } from 'typeorm';
import UserDao from '../../dao/user/UserDao';
import { User, UserRole } from '../../entity/User';
import BaseService from '../BaseService';


interface UserPostBody {
    email: string;
    username: string;
    role: UserRole;
}

interface UserPutBody {
    role: UserRole;
    username: string;
}

export interface UserGetParams {
    email: string;
}

export default class UserService extends BaseService {
    public async _get(queryParams: UserGetParams, email: string) {
        return this.transaction(async (manager: EntityManager) => {
            const userDao = new UserDao(manager);
            //const user = await userDao.findByEmail(email);
            const user = await userDao.find(queryParams);
            
            if (user) {
                return user;
            }
        });
    }

    public async _post(requestBody: UserPostBody, email: string): Promise<User> {
        return this.transaction(async (manager: EntityManager) => {
            const userDao = new UserDao(manager);
 
            // const user = await userDao.create({
            //     email: requestBody.email,
            //     role: requestBody.role,
            //     username: requestBody.username
            // });

          
            
            return await userDao.findById(1);
        });
    }

    public async _put(
        requestBody: UserPutBody,
       // pathParameters: APIGatewayEvent['pathParameters'],
        email: string,
    ) {
       // const id = parseInt(pathParameters!.userId, 10);
        return this.transaction(async (manager: EntityManager) => {
            const userDao = new UserDao(manager);
            // const user = await userDao.findById(id);
            // if (user) {
                
            //     await userDao.update(id, othersBody);
            //     return await userDao.findById(id);
            // }
            return Promise.reject("User don't exist");
        });
    }

    public async _delete(email: string) {
        //const id = parseInt(pathParameters!.userId, 10);
        return this.transaction(async (manager: EntityManager) => {
            const userDao = new UserDao(manager);
            // const user = await userDao.findById(id);
            // const deleted = await userDao.delete(id);
            // if (deleted) {
                
            // }
        });
    }
}
