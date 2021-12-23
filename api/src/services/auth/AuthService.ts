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

export interface UserGetParams {
    email: string;
}


export default class AuthService extends BaseService {
    
    public async _post(requestBody: LoginPostBody, email: string): Promise<User> {
        return this.transaction(async (manager: EntityManager) => {
            const userDao = new UserDao(manager);
            const userExist = await userDao.findByEmail(requestBody.email);

            
            if (userExist) {
                return Promise.reject({ message: 'User already exist with this email' });
                //return "User already exist with this email";
            }
            const user = await userDao.create({
                email: requestBody.email,
                password: requestBody.password
            });

            // if (requestBody.assignees.length > 0) {
            //     const assignees = await this.createAssignees(user.id, requestBody.assignees);
            //     await assigneeDao.insertAssignees(assignees);
            // }
            if (user) {
                return await userDao.findById(user.id);
            }
        });
    }

 
}
