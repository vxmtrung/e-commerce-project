import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1741708488257 implements MigrationInterface {
  name = 'Migration1741708488257';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product_img" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "product_instance_id" character varying NOT NULL, 
      "link" character varying NOT NULL, 
      "status" boolean NOT NULL DEFAULT true, 
      CONSTRAINT "PK_717ef9496d87f376e9e264d7eb0" PRIMARY KEY ("id"));

      CREATE TABLE "shipping_addresses" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "receiver_name" character varying NOT NULL, 
      "receiver_phone" character varying NOT NULL, 
      "city" character varying NOT NULL, 
      "district" character varying NOT NULL, 
      "town" character varying NOT NULL, 
      "additional_information" character varying, 
      "is_default" boolean NOT NULL DEFAULT false, 
      "status" boolean NOT NULL DEFAULT true, 
      CONSTRAINT "PK_cced78984eddbbe24470f226692" PRIMARY KEY ("id"));

      CREATE TABLE "product_instances" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "name" character varying NOT NULL, 
      "description" character varying, 
      "price" integer NOT NULL, 
      "quantity" integer NOT NULL, 
      "product_id" character varying NOT NULL, 
      "discount_percent" integer NOT NULL DEFAULT 0,
      "status" boolean NOT NULL DEFAULT true, 
      "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, 
      "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
      "deleted_at" TIMESTAMP, 
      CONSTRAINT "PK_a5258b37f6f98ae3ffbe9504516" PRIMARY KEY ("id"));

      CREATE TYPE "public"."orders_status_enum" AS ENUM('IN_PROGRESS', 'SENT', 'RECEIVED', 'CANCELLED');
      CREATE TABLE "orders" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "status" "public"."orders_status_enum" NOT NULL DEFAULT 'IN_PROGRESS', 
      "shipping_address" character varying NOT NULL, 
      "user_id" character varying NOT NULL, 
      "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, 
      "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
      "deleted_at" TIMESTAMP, 
      CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"));

      CREATE TABLE "products" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "name" character varying NOT NULL, 
      "description" character varying, 
      "status" boolean NOT NULL DEFAULT true, 
      "category_id" character varying NOT NULL,
      "brand_id" character varying NOT NULL,
      "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
      "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
      "deleted_at" TIMESTAMP, 
      CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"));

      CREATE TABLE "reviews" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "user_id" character varying NOT NULL, 
      "product_id" character varying NOT NULL, 
      "score" integer NOT NULL DEFAULT '5', 
      "comment" character varying NOT NULL, 
      "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, 
      CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"));

      CREATE TYPE "public"."payments_payment_method_enum" AS ENUM('CREDIT_CARD', 'BANK_TRANSFER', 'CASH_ON_DELIVERY');
      CREATE TYPE "public"."payments_payment_status_enum" AS ENUM('PENDING', 'COMPLETED', 'FAILED');

      CREATE TABLE "payments" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "order_id" character varying NOT NULL, 
      "payment_method" "public"."payments_payment_method_enum" NOT NULL DEFAULT 'CASH_ON_DELIVERY', 
      "payment_status" "public"."payments_payment_status_enum" NOT NULL DEFAULT 'PENDING', 
      "amount" integer NOT NULL, 
      "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, 
      CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"));

      CREATE TABLE "categories" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "name" character varying NOT NULL, 
      "status" boolean NOT NULL DEFAULT true, 
      CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"));

      CREATE TABLE "order_items" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "product_id" character varying NOT NULL, 
      "order_id" character varying NOT NULL, 
      "quantity" integer NOT NULL DEFAULT '1', 
      CONSTRAINT "PK_005269d8574e6fac0493715c308" PRIMARY KEY ("id"));

      CREATE TYPE "public"."users_role_enum" AS ENUM('USER', 'ADMIN');

      CREATE TABLE "users" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "name" character varying NOT NULL, 
      "email" character varying NOT NULL, 
      "phone_number" character varying NOT NULL, 
      "username" character varying NOT NULL, 
      "password" character varying NOT NULL, 
      "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER', 
      "status" boolean NOT NULL DEFAULT false, 
      "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, 
      "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
      "deleted_at" TIMESTAMP, 
      CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), 
      CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"));

      CREATE TABLE "brands" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "name" character varying NOT NULL, 
      "status" boolean NOT NULL DEFAULT true, 
      CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id"));`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "brands"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "order_items"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "payments"`);
    await queryRunner.query(`DROP TABLE "reviews"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "product_instances"`);
    await queryRunner.query(`DROP TABLE "shipping_addresses"`);
    await queryRunner.query(`DROP TABLE "product_img"`);
    await queryRunner.query(`DROP TYPE "public"."payments_payment_method_enum"`);
    await queryRunner.query(`DROP TYPE "public"."payments_payment_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
  }
}
