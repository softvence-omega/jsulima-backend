import { IsString, IsNotEmpty, IsEnum, IsNumber, IsBoolean, IsDateString, IsArray } from 'class-validator';
import { PlanStatus, PlanType,  } from '@prisma/client';
import { PartialType } from '@nestjs/swagger';

export class CreatePlanDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  price: number;

  @IsArray()
  @IsString({ each: true })
  features: string[];

  @IsEnum(PlanType)
  planType: PlanType;

  @IsEnum(PlanStatus)
  status: PlanStatus;

  @IsDateString()
  endDate: string;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  userId: string;
}

export class UpdatePlanDto extends PartialType(CreatePlanDto) {}
