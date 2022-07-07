import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatedRelationBetweenUserAndWorkspace1657201355338
  implements MigrationInterface
{
  name = 'CreatedRelationBetweenUserAndWorkspace1657201355338';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "workspaces" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "ownerId" integer, CONSTRAINT "PK_098656ae401f3e1a4586f47fd8e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces" ADD CONSTRAINT "FK_77607c5b6af821ec294d33aab0c" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workspaces" DROP CONSTRAINT "FK_77607c5b6af821ec294d33aab0c"`,
    );
    await queryRunner.query(`DROP TABLE "workspaces"`);
  }
}
