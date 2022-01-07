import { EntityManager, Repository } from 'typeorm';
import BaseDao from '../BaseDao';
import { UserOauthAccessToken } from '../../entity/UserOauthAccessToken';
import { UserGetParams } from '../../services/auth/AuthService';
//import * as bcrypt from 'bcrypt';
const bcrypt = require('bcrypt');

export default class OauthAccessTokenDao extends BaseDao {
    protected repository: Repository<UserOauthAccessToken>;
    

    private readonly userId: number | undefined;

    constructor(manager: EntityManager) {
        super(manager);
        //this.userId = userId;
        this.repository = this.manager.getRepository(UserOauthAccessToken);
    }

    async findByEmail(email: string) {
        return this.repository.findOne({
            where: {
                email,
            },
        });
    }


    
}
