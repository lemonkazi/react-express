import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class userOauthTokenAccessTable1641397745015 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user_oauth_token_access',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'user_id',
                        type: 'int',
                        isNullable: true,
                        length: '11',
                    },
                    {
                        name: 'token',
                        type: 'text',
                        isNullable: true,
                        default: null
                    },
                    {
                        name: 'expired',
                        type: 'timestamp',
                        isNullable: true,
                        default: null,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'modified_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'created_by',
                        type: 'varchar(50)',
                        default: 'current_user',
                    },
                    {
                        name: 'modified_by',
                        type: 'varchar(50)',
                        default: 'current_user',
                    },
                    {
                        name: 'disabled',
                        type: 'int',
                        isNullable: true,
                        length: '5',
                    },
                    {
                        name: 'deleted',
                        type: 'int',
                        isNullable: true,
                        length: '5',
                    },
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user_oauth_token_access', true, true, true);
    }

}
