import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1784131736950 implements MigrationInterface {
    name = 'InitialSchema1784131736950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "farmer_profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "district" character varying NOT NULL, "region" character varying NOT NULL, CONSTRAINT "REL_f6bf984d7edec8d152bb3cbef3" UNIQUE ("userId"), CONSTRAINT "PK_4718a4781e7bd8b1f701b9a3cc1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "buyer_profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, CONSTRAINT "REL_38b83d9a65dc1c0e43333cb309" UNIQUE ("userId"), CONSTRAINT "PK_6e8158bfa9ea36f4a16df9c1f41" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "officer_profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "specialtyCrops" text, CONSTRAINT "REL_0022b6a597506c16d517051e65" UNIQUE ("userId"), CONSTRAINT "PK_07881bd71e291abdbb50bc62091" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'FARMER', 'BUYER', 'OFFICER')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying, "phone" character varying, "passwordHash" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL, "language" character varying NOT NULL DEFAULT 'en', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "farms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "farmerId" uuid NOT NULL, "name" character varying NOT NULL, "latitude" numeric(10,7) NOT NULL, "longitude" numeric(10,7) NOT NULL, "sizeHectares" numeric(10,2) NOT NULL, "soilNotes" text, CONSTRAINT "PK_39aff9c35006b14025bba5a43d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "crops" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "faoCropCode" character varying NOT NULL, "temperatureRangeMin" numeric(5,2) NOT NULL, "temperatureRangeMax" numeric(5,2) NOT NULL, "rainfallRangeMin" numeric(6,2) NOT NULL, "rainfallRangeMax" numeric(6,2) NOT NULL, "marketRank" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_6abcd81a0474f8a12a610013ecb" UNIQUE ("faoCropCode"), CONSTRAINT "PK_098dbeb7c803dc7c08a7f02b805" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."advisory_requests_status_enum" AS ENUM('PENDING', 'ACCEPTED', 'REJECTED')`);
        await queryRunner.query(`CREATE TABLE "advisory_requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "farmerId" uuid NOT NULL, "farmId" uuid NOT NULL, "cropId" uuid NOT NULL, "description" text NOT NULL, "photoUrl" character varying, "status" "public"."advisory_requests_status_enum" NOT NULL DEFAULT 'PENDING', "assignedOfficerId" uuid, "previousOfficerIds" text, CONSTRAINT "PK_9a855e852879954ccec7c2d226b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "advisory_responses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "advisoryRequestId" uuid NOT NULL, "officerId" uuid NOT NULL, "message" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1cc338d0ee4f03d4d5291ca5551" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."listings_status_enum" AS ENUM('ACTIVE', 'SOLD', 'CLOSED')`);
        await queryRunner.query(`CREATE TABLE "listings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "farmerId" uuid NOT NULL, "cropId" uuid NOT NULL, "quantity" numeric(10,2) NOT NULL, "unit" character varying NOT NULL, "pricePerUnit" numeric(10,2) NOT NULL, "currency" character varying NOT NULL DEFAULT 'TZS', "photoUrl" character varying, "status" "public"."listings_status_enum" NOT NULL DEFAULT 'ACTIVE', CONSTRAINT "PK_520ecac6c99ec90bcf5a603cdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."deals_status_enum" AS ENUM('PENDING', 'ACCEPTED', 'REJECTED')`);
        await queryRunner.query(`CREATE TABLE "deals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "listingId" uuid NOT NULL, "buyerId" uuid NOT NULL, "farmerId" uuid NOT NULL, "status" "public"."deals_status_enum" NOT NULL DEFAULT 'PENDING', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "respondedAt" TIMESTAMP, CONSTRAINT "PK_8c66f03b250f613ff8615940b4b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recommendations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "farmId" uuid NOT NULL, "cropId" uuid NOT NULL, "suitable" boolean NOT NULL, "generatedAt" TIMESTAMP NOT NULL DEFAULT now(), "weatherSnapshotJson" jsonb, CONSTRAINT "PK_23a8d2db26db8cabb6ae9d6cd87" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "weather_records" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "farmId" uuid NOT NULL, "temperature" numeric(5,2) NOT NULL, "rainfall" numeric(6,2) NOT NULL, "humidity" numeric(5,2) NOT NULL, "windSpeed" numeric(5,2) NOT NULL, "fetchedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b16fc9005eac35331d6dc3a2cef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "farmer_profiles" ADD CONSTRAINT "FK_f6bf984d7edec8d152bb3cbef31" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "buyer_profiles" ADD CONSTRAINT "FK_38b83d9a65dc1c0e43333cb3098" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "officer_profiles" ADD CONSTRAINT "FK_0022b6a597506c16d517051e65e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "farms" ADD CONSTRAINT "FK_580fc6f3650c22a430809b4fefb" FOREIGN KEY ("farmerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advisory_requests" ADD CONSTRAINT "FK_3966578c9354f71c041090ef78c" FOREIGN KEY ("farmerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advisory_requests" ADD CONSTRAINT "FK_083c342be5596bb7aac5cbd8cce" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advisory_requests" ADD CONSTRAINT "FK_e667523c66a9930321f1b525754" FOREIGN KEY ("cropId") REFERENCES "crops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advisory_requests" ADD CONSTRAINT "FK_7489689477e10f0d878dd805d4b" FOREIGN KEY ("assignedOfficerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advisory_responses" ADD CONSTRAINT "FK_42ed8c18577b073aead4193a11d" FOREIGN KEY ("advisoryRequestId") REFERENCES "advisory_requests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advisory_responses" ADD CONSTRAINT "FK_30141d6bbbcab6bf2262681c32a" FOREIGN KEY ("officerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "listings" ADD CONSTRAINT "FK_3ea4e323c3aa0175643eb1acfea" FOREIGN KEY ("farmerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "listings" ADD CONSTRAINT "FK_f77e48a2f5e9a211470de22edb1" FOREIGN KEY ("cropId") REFERENCES "crops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deals" ADD CONSTRAINT "FK_b23277bb02c216a3374bd0ff59c" FOREIGN KEY ("listingId") REFERENCES "listings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deals" ADD CONSTRAINT "FK_aeb21cf472e1d0c10ba255031a1" FOREIGN KEY ("buyerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deals" ADD CONSTRAINT "FK_69fd35416f1f1483e32a2a359fa" FOREIGN KEY ("farmerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recommendations" ADD CONSTRAINT "FK_731c67084165632a5108b31552c" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recommendations" ADD CONSTRAINT "FK_31d423f398c8c6473ae94745372" FOREIGN KEY ("cropId") REFERENCES "crops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "weather_records" ADD CONSTRAINT "FK_02d163d3eccf7ea917de0b70893" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "weather_records" DROP CONSTRAINT "FK_02d163d3eccf7ea917de0b70893"`);
        await queryRunner.query(`ALTER TABLE "recommendations" DROP CONSTRAINT "FK_31d423f398c8c6473ae94745372"`);
        await queryRunner.query(`ALTER TABLE "recommendations" DROP CONSTRAINT "FK_731c67084165632a5108b31552c"`);
        await queryRunner.query(`ALTER TABLE "deals" DROP CONSTRAINT "FK_69fd35416f1f1483e32a2a359fa"`);
        await queryRunner.query(`ALTER TABLE "deals" DROP CONSTRAINT "FK_aeb21cf472e1d0c10ba255031a1"`);
        await queryRunner.query(`ALTER TABLE "deals" DROP CONSTRAINT "FK_b23277bb02c216a3374bd0ff59c"`);
        await queryRunner.query(`ALTER TABLE "listings" DROP CONSTRAINT "FK_f77e48a2f5e9a211470de22edb1"`);
        await queryRunner.query(`ALTER TABLE "listings" DROP CONSTRAINT "FK_3ea4e323c3aa0175643eb1acfea"`);
        await queryRunner.query(`ALTER TABLE "advisory_responses" DROP CONSTRAINT "FK_30141d6bbbcab6bf2262681c32a"`);
        await queryRunner.query(`ALTER TABLE "advisory_responses" DROP CONSTRAINT "FK_42ed8c18577b073aead4193a11d"`);
        await queryRunner.query(`ALTER TABLE "advisory_requests" DROP CONSTRAINT "FK_7489689477e10f0d878dd805d4b"`);
        await queryRunner.query(`ALTER TABLE "advisory_requests" DROP CONSTRAINT "FK_e667523c66a9930321f1b525754"`);
        await queryRunner.query(`ALTER TABLE "advisory_requests" DROP CONSTRAINT "FK_083c342be5596bb7aac5cbd8cce"`);
        await queryRunner.query(`ALTER TABLE "advisory_requests" DROP CONSTRAINT "FK_3966578c9354f71c041090ef78c"`);
        await queryRunner.query(`ALTER TABLE "farms" DROP CONSTRAINT "FK_580fc6f3650c22a430809b4fefb"`);
        await queryRunner.query(`ALTER TABLE "officer_profiles" DROP CONSTRAINT "FK_0022b6a597506c16d517051e65e"`);
        await queryRunner.query(`ALTER TABLE "buyer_profiles" DROP CONSTRAINT "FK_38b83d9a65dc1c0e43333cb3098"`);
        await queryRunner.query(`ALTER TABLE "farmer_profiles" DROP CONSTRAINT "FK_f6bf984d7edec8d152bb3cbef31"`);
        await queryRunner.query(`DROP TABLE "weather_records"`);
        await queryRunner.query(`DROP TABLE "recommendations"`);
        await queryRunner.query(`DROP TABLE "deals"`);
        await queryRunner.query(`DROP TYPE "public"."deals_status_enum"`);
        await queryRunner.query(`DROP TABLE "listings"`);
        await queryRunner.query(`DROP TYPE "public"."listings_status_enum"`);
        await queryRunner.query(`DROP TABLE "advisory_responses"`);
        await queryRunner.query(`DROP TABLE "advisory_requests"`);
        await queryRunner.query(`DROP TYPE "public"."advisory_requests_status_enum"`);
        await queryRunner.query(`DROP TABLE "crops"`);
        await queryRunner.query(`DROP TABLE "farms"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "officer_profiles"`);
        await queryRunner.query(`DROP TABLE "buyer_profiles"`);
        await queryRunner.query(`DROP TABLE "farmer_profiles"`);
    }

}
