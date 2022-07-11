import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  status: string;

  @IsDateString()
  @IsNotEmpty()
  date: Date;
}
