import { EntityManager, Repository } from 'typeorm';
import BaseDao from '../BaseDao';
import { User } from '../../entity/User';
import { UserGetParams } from '../../services/user/UserService';

export default class UserDao extends BaseDao {
    protected repository: Repository<User>;

    constructor(manager: EntityManager) {
        super(manager);
        this.repository = this.manager.getRepository(User);
    }

    async findByEmail(email: string) {
        return this.repository.findOne({
            where: {
                email,
            },
        });
    }

    async getHash(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds);
    }
    async compareHash(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    
}
