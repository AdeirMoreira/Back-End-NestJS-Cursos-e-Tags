import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1661809537310 implements MigrationInterface {
    name = 'createTables1661809537310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Udemy-NestJS-Tags" ("id" character varying NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "UQ_d3687b2046d14de2fc2a60de5bb" UNIQUE ("name"), CONSTRAINT "PK_2d29335248aef573b86afe88991" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Udemy-NestJS-Courses" ("id" character varying NOT NULL, "name" character varying(50) NOT NULL, "description" text NOT NULL, CONSTRAINT "UQ_499f8b251f573bd010afc33ad02" UNIQUE ("name"), CONSTRAINT "PK_4ccde2fa35924fcc2c627a6256c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Udemy-NestJS-CourseTagPivoTable" ("udemyNestJSCoursesId" character varying NOT NULL, "udemyNestJSTagsId" character varying NOT NULL, CONSTRAINT "PK_e191613846345b20254d0c783b6" PRIMARY KEY ("udemyNestJSCoursesId", "udemyNestJSTagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e3f2e12527ec369df684912cc7" ON "Udemy-NestJS-CourseTagPivoTable" ("udemyNestJSCoursesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ab55511fe986e81b0d4d0e03eb" ON "Udemy-NestJS-CourseTagPivoTable" ("udemyNestJSTagsId") `);
        await queryRunner.query(`ALTER TABLE "Udemy-NestJS-CourseTagPivoTable" ADD CONSTRAINT "FK_e3f2e12527ec369df684912cc78" FOREIGN KEY ("udemyNestJSCoursesId") REFERENCES "Udemy-NestJS-Courses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Udemy-NestJS-CourseTagPivoTable" ADD CONSTRAINT "FK_ab55511fe986e81b0d4d0e03eb6" FOREIGN KEY ("udemyNestJSTagsId") REFERENCES "Udemy-NestJS-Tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Udemy-NestJS-CourseTagPivoTable" DROP CONSTRAINT "FK_ab55511fe986e81b0d4d0e03eb6"`);
        await queryRunner.query(`ALTER TABLE "Udemy-NestJS-CourseTagPivoTable" DROP CONSTRAINT "FK_e3f2e12527ec369df684912cc78"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ab55511fe986e81b0d4d0e03eb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e3f2e12527ec369df684912cc7"`);
        await queryRunner.query(`DROP TABLE "Udemy-NestJS-CourseTagPivoTable"`);
        await queryRunner.query(`DROP TABLE "Udemy-NestJS-Courses"`);
        await queryRunner.query(`DROP TABLE "Udemy-NestJS-Tags"`);
    }

}
