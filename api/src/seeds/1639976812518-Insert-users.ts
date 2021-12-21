import {MigrationInterface, QueryRunner} from "typeorm";

export class InsertUsers1639976812518 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT into users(username, email, password ,role) VALUES
            ('sadmin', 'sadmin@test.dev', 'sadmin', 'superAdmin'),
            ('tadmin', 'tadmin@test.dev', 'tadmin','admin'),
            ('user', 'user@test.dev', 'user','user');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM users CASCADE;
        `);
    }

}
