import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersMigration1597391605359 implements MigrationInterface {
    name = 'CreateUsersMigration1597391605359';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: 'active',
                    type: 'tinyint',
                    default: false,
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
