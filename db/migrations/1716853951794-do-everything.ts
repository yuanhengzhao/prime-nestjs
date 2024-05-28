import { MigrationInterface, QueryRunner } from 'typeorm';

export class DoEverything1716853951794 implements MigrationInterface {
  name = 'DoEverything1716853951794';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "task" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "bson_id" character varying NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "submission" ("id" SERIAL NOT NULL, "round" integer NOT NULL, "task_id" integer NOT NULL, CONSTRAINT "PK_7faa571d0e4a7076e85890c9bd0" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TABLE "submission" ADD CONSTRAINT "FK_9cddf02a64ceed9d4ee20cf9060" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "submissions" DROP CONSTRAINT "FK_9cddf02a64ceed9d4ee20cf9060"');
    await queryRunner.query('DROP TABLE "users"');
    await queryRunner.query('DROP TABLE "submissions"');
    await queryRunner.query('DROP TABLE "tasks"');
  }
}
