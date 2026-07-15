import { MigrationInterface, QueryRunner } from "typeorm";

export class AddResponseNotes1784150064112 implements MigrationInterface {
    name = 'AddResponseNotes1784150064112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advisory_requests" ADD "responseNotes" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advisory_requests" DROP COLUMN "responseNotes"`);
    }

}
