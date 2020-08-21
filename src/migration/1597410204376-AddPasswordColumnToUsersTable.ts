import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddPasswordColumnToUsersTable1597410204376 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name: 'password',
            type: 'varchar',
            isNullable: true,
            default: null
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'password');
    }

}
