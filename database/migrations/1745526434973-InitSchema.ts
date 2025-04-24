import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1745526434973 implements MigrationInterface {
    name = 'InitSchema1745526434973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuario" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "correo" character varying NOT NULL, CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contacto" ("id" SERIAL NOT NULL, "fecha" date NOT NULL, "id_usuario" integer NOT NULL, "id_contacto" integer NOT NULL, "id_cuenta" integer NOT NULL, CONSTRAINT "PK_fcab8128cce0aac92da26cf1883" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaccion" ("id" SERIAL NOT NULL, "cuenta_origen" integer NOT NULL, "cuenta_destino" integer NOT NULL, "monto" numeric(10,2) NOT NULL, "fecha" date NOT NULL, CONSTRAINT "PK_1d7fb1e642fb44d52a2fce77fc6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cuenta" ("id" SERIAL NOT NULL, "numero_cuenta" character varying NOT NULL, "fecha" date NOT NULL, "saldo" numeric(10,2) NOT NULL, "id_usuario" integer NOT NULL, "id_referido" integer, CONSTRAINT "PK_c4a76091d90bd15f5c65e9c76b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comision" ("id" SERIAL NOT NULL, "fecha" date NOT NULL, "id_transaccion" integer NOT NULL, "id_cuenta_beneficiaria" integer NOT NULL, CONSTRAINT "PK_b131d9949148c5aa6d80795652a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contacto" ADD CONSTRAINT "FK_d1ca2a152c03cda52ae08a71ec5" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contacto" ADD CONSTRAINT "FK_c11db877c462111c6961134b3e0" FOREIGN KEY ("id_contacto") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contacto" ADD CONSTRAINT "FK_40ea3cc2bf9abf411ff95b8ac13" FOREIGN KEY ("id_cuenta") REFERENCES "cuenta"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaccion" ADD CONSTRAINT "FK_f6ebe2ab30b8d7cd6ba5c9ce717" FOREIGN KEY ("cuenta_origen") REFERENCES "cuenta"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaccion" ADD CONSTRAINT "FK_7600b2cf0356d9e441d193fddc8" FOREIGN KEY ("cuenta_destino") REFERENCES "cuenta"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cuenta" ADD CONSTRAINT "FK_61924c88a9f6343805d0ffae14d" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cuenta" ADD CONSTRAINT "FK_19efcb4d40883bff529764bb176" FOREIGN KEY ("id_referido") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comision" ADD CONSTRAINT "FK_563fe79216ce09df226dee0f09e" FOREIGN KEY ("id_transaccion") REFERENCES "transaccion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comision" ADD CONSTRAINT "FK_e77340d6690f4dc2a1538e01f99" FOREIGN KEY ("id_cuenta_beneficiaria") REFERENCES "cuenta"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comision" DROP CONSTRAINT "FK_e77340d6690f4dc2a1538e01f99"`);
        await queryRunner.query(`ALTER TABLE "comision" DROP CONSTRAINT "FK_563fe79216ce09df226dee0f09e"`);
        await queryRunner.query(`ALTER TABLE "cuenta" DROP CONSTRAINT "FK_19efcb4d40883bff529764bb176"`);
        await queryRunner.query(`ALTER TABLE "cuenta" DROP CONSTRAINT "FK_61924c88a9f6343805d0ffae14d"`);
        await queryRunner.query(`ALTER TABLE "transaccion" DROP CONSTRAINT "FK_7600b2cf0356d9e441d193fddc8"`);
        await queryRunner.query(`ALTER TABLE "transaccion" DROP CONSTRAINT "FK_f6ebe2ab30b8d7cd6ba5c9ce717"`);
        await queryRunner.query(`ALTER TABLE "contacto" DROP CONSTRAINT "FK_40ea3cc2bf9abf411ff95b8ac13"`);
        await queryRunner.query(`ALTER TABLE "contacto" DROP CONSTRAINT "FK_c11db877c462111c6961134b3e0"`);
        await queryRunner.query(`ALTER TABLE "contacto" DROP CONSTRAINT "FK_d1ca2a152c03cda52ae08a71ec5"`);
        await queryRunner.query(`DROP TABLE "comision"`);
        await queryRunner.query(`DROP TABLE "cuenta"`);
        await queryRunner.query(`DROP TABLE "transaccion"`);
        await queryRunner.query(`DROP TABLE "contacto"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
    }

}
