import { EntityManager, Repository,MigrationInterface, QueryRunner, getRepository ,createConnection, getConnection, ConnectionOptions} from "typeorm";
import { User } from "../entity/User";
export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
    SUPER_ADMIN = 'superAdmin',
}

export class InsertUsers1639976812518 implements MigrationInterface {

    
    public async up(queryRunner: QueryRunner): Promise<any> {
        let user = new User();
        const userRepository = getRepository(User);
        user.username = 'sadmin';
        user.email = 'sadmin@test.dev';
        user.password = '12345678';
        user.hashPassword();
        user.role = 'SUPER_ADMIN' as UserRole;
        await userRepository.save(user);
        
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            DELETE FROM users CASCADE;
        `);
    }

}
