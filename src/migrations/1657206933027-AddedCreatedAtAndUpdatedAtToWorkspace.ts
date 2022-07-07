import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedCreatedAtAndUpdatedAtToWorkspace1657206933027
  implements MigrationInterface
{
  name = 'AddedCreatedAtAndUpdatedAtToWorkspace1657206933027';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workspaces" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "workspaces" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "workspaces" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "workspaces" DROP COLUMN "createdAt"`);
  }
}
