import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePromoCodeDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNumber()
  discount: number;

  @IsDateString()
  expiresAt: string;

  @IsString()
  @IsOptional()
  userId?: string;
}
