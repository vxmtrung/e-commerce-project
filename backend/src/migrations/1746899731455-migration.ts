import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1746899731455 implements MigrationInterface {
  name = 'Migration1746899731455';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "vouchers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "description" character varying NOT NULL, "discount_type" character varying NOT NULL, "discount_value" integer NOT NULL, "quantity" integer NOT NULL, "used_quantity" integer NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_efc30b2b9169e05e0e1e19d6dd6" UNIQUE ("code"), CONSTRAINT "PK_ed1b7dd909a696560763acdbc04" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "vouchers"`);
  }
}
