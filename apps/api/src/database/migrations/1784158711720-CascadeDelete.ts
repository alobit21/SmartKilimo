import { MigrationInterface, QueryRunner } from "typeorm";

export class CascadeDelete1784158711720 implements MigrationInterface {
    name = 'CascadeDelete1784158711720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deals" DROP CONSTRAINT "FK_b23277bb02c216a3374bd0ff59c"`);
        await queryRunner.query(`ALTER TABLE "deals" ADD CONSTRAINT "FK_b23277bb02c216a3374bd0ff59c" FOREIGN KEY ("listingId") REFERENCES "listings"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deals" DROP CONSTRAINT "FK_b23277bb02c216a3374bd0ff59c"`);
        await queryRunner.query(`ALTER TABLE "deals" ADD CONSTRAINT "FK_b23277bb02c216a3374bd0ff59c" FOREIGN KEY ("listingId") REFERENCES "listings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
