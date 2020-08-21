import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddOAuthFieldsToUsersTable1598002742566 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name: 'google_id',
            type: 'varchar',
            isNullable: true
        }));
        await queryRunner.addColumn('users', new TableColumn({
            name: 'facebook_id',
            type: 'varchar',
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'google_id');
        await queryRunner.dropColumn('users', 'facebook_id');
    }

}
