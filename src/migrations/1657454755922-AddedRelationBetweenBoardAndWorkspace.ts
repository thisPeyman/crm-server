import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedRelationBetweenBoardAndWorkspace1657454755922
  implements MigrationInterface
{
  name = 'AddedRelationBetweenBoardAndWorkspace1657454755922';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "boards" ADD "workspaceId" integer`);
    await queryRunner.query(
      `ALTER TABLE "boards" ADD CONSTRAINT "FK_f13eef6b2a45019e1df9cfe9963" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "boards" DROP CONSTRAINT "FK_f13eef6b2a45019e1df9cfe9963"`,
    );
    await queryRunner.query(`ALTER TABLE "boards" DROP COLUMN "workspaceId"`);
  }
}
