import { APIGatewayEvent } from 'aws-lambda';
import { EntityManager } from 'typeorm';
import UserDao from '../../dao/user/UserDao';
import { User, UserRole } from '../../entity/User';
import BaseService from '../BaseService';
import * as Response from '../../lib/response/response';


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
            const userExist = await userDao.findByEmail(requestBody.email);

            
            if (userExist) {
                return Promise.reject({ message: 'User already exist with this email' });
                //return "User already exist with this email";
            }
            const user = await userDao.create({
                email: requestBody.email,
                role: requestBody.role,
                username: requestBody.username
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

    public async _put(
        requestBody: UserPutBody,
        pathParameters: APIGatewayEvent,
        email: string,
    ) {
        const id = parseInt((<any>pathParameters).userId, 10);
        
        return this.transaction(async (manager: EntityManager) => {
            const userDao = new UserDao(manager);
            const user = await userDao.findById(id);
            //console.log(user)
            if (user) {
                const { ...othersBody } = requestBody;
                await userDao.update(id, othersBody);
                return await userDao.findById(id);
            }
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
