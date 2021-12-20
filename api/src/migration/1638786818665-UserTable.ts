import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class UserTable1638786818665 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isUnique: false,
                    },
                    {
                        name: 'username',
                        type: 'varchar',
                        isUnique: false,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'role',
                        type: 'varchar',
                        default: "'user'",
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
                ],
            }),
            true,
        );

       

        // await queryRunner.addColumn(
        //     'users',
        //     new TableColumn({
        //         name: 'organization_id',
        //         type: 'int',
        //         isNullable: true,
        //     }),
        // );

        // await queryRunner.createForeignKey(
        //     'users',
        //     new TableForeignKey({
        //         columnNames: ['organization_id'],
        //         referencedColumnNames: ['id'],
        //         referencedTableName: 'organization',
        //     }),
        // );

        // await queryRunner.query(`
        //     ALTER TABLE "daily_labor_costs" ADD "created_at" timestamp NOT NULL DEFAULT NOW();
        //     ALTER TABLE "daily_labor_costs" ADD "modified_at" timestamp NOT NULL DEFAULT NOW();
        //     ALTER TABLE "daily_labor_costs" ADD "created_by" varchar(50) NOT NULL DEFAULT current_user;
        //     ALTER TABLE "daily_labor_costs" ADD "modified_by" varchar(50) NOT NULL DEFAULT current_user;
        // `);

        // create trigger for update timestamp on modified_by
        // await queryRunner.query(`
        //     CREATE OR REPLACE FUNCTION trigger_set_modified()
        //     RETURNS TRIGGER AS $$
        //     BEGIN
        //       NEW.modified_at = NOW();
        //       NEW.modified_by = current_user;
        //       RETURN NEW;
        //     END;
        //     $$ LANGUAGE plpgsql;
        // `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users', true, true, true);
    }

}
