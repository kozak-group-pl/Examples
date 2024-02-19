import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddTriesToVerifications1652252560930 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('user-verification-id',
          [
              new TableColumn({ name: 'tries', type: 'integer', isNullable: true, default: 5 }),
              new TableColumn({ name: 'isAvailable', type: 'boolean', isNullable: true, default: true }),
          ]);

        await queryRunner.addColumns('user-verification-poa',
          [
              new TableColumn({ name: 'tries', type: 'integer', isNullable: true, default: 3 }),
              new TableColumn({ name: 'isAvailable', type: 'boolean', isNullable: true, default: true }),
          ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
