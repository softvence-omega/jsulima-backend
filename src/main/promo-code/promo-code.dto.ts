import { PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreatePromoCodeDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNumber()
  discount: number;

  @IsDateString()
  expiresAt: string;

  @IsOptional()
  @IsString()
  userId?: string;
}

export class UpdatePromoCodeDto extends PartialType(CreatePromoCodeDto) {}
