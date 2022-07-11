import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedDefaultDateToClientEntity1657524542966
  implements MigrationInterface
{
  name = 'AddedDefaultDateToClientEntity1657524542966';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "clients" ALTER COLUMN "date" SET DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "clients" ALTER COLUMN "date" DROP DEFAULT`,
    );
  }
}
