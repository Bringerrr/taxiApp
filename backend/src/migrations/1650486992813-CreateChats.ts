import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateChats1650486992813 implements MigrationInterface {
  name = 'CreateChats1650486992813';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "chats" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_0117647b3c4a4e5ff198aeb6206" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "chats"`);
  }
}
