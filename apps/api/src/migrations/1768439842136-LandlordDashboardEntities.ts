import { MigrationInterface, QueryRunner } from "typeorm";

export class LandlordDashboardEntities1768439842136 implements MigrationInterface {
    name = 'LandlordDashboardEntities1768439842136'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tenant" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying, "propertyName" character varying NOT NULL, "propertyId" character varying NOT NULL, "propertyRefId" uuid, "landlordId" uuid NOT NULL, "status" character varying NOT NULL DEFAULT 'Active', "paymentStatus" character varying NOT NULL DEFAULT 'Pending', "leaseEnd" character varying, "details" jsonb, CONSTRAINT "PK_da8c6efd67bb301e810e56ac139" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "application" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "tenantId" uuid NOT NULL, "landlordId" uuid NOT NULL, "propertyId" uuid NOT NULL, "tenantName" character varying NOT NULL, "tenantEmail" character varying NOT NULL, "tenantPhone" character varying, "propertyTitle" character varying NOT NULL, "propertyImage" character varying, "status" character varying NOT NULL DEFAULT 'Pending', "details" jsonb, "financing" jsonb, "submittedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_569e0c3e863ebdf5f2408ee1670" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tenant" ADD CONSTRAINT "FK_b45fdbe5e2463d659d32e267a9e" FOREIGN KEY ("propertyRefId") REFERENCES "property"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tenant" ADD CONSTRAINT "FK_96df069749e17c260a1b12aa2b1" FOREIGN KEY ("landlordId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application" ADD CONSTRAINT "FK_8b875ce1e1de8414832a2c58184" FOREIGN KEY ("tenantId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application" ADD CONSTRAINT "FK_50948449fb61793634855ab351c" FOREIGN KEY ("landlordId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application" ADD CONSTRAINT "FK_a4820df638a267ecd98c0243e5e" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application" DROP CONSTRAINT "FK_a4820df638a267ecd98c0243e5e"`);
        await queryRunner.query(`ALTER TABLE "application" DROP CONSTRAINT "FK_50948449fb61793634855ab351c"`);
        await queryRunner.query(`ALTER TABLE "application" DROP CONSTRAINT "FK_8b875ce1e1de8414832a2c58184"`);
        await queryRunner.query(`ALTER TABLE "tenant" DROP CONSTRAINT "FK_96df069749e17c260a1b12aa2b1"`);
        await queryRunner.query(`ALTER TABLE "tenant" DROP CONSTRAINT "FK_b45fdbe5e2463d659d32e267a9e"`);
        await queryRunner.query(`DROP TABLE "application"`);
        await queryRunner.query(`DROP TABLE "tenant"`);
    }

}
