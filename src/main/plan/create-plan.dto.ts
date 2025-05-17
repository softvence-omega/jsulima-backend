import { 
  IsString, 
  IsNotEmpty, 
  IsEnum, 
  IsNumber, 
  IsBoolean, 
  IsDateString, 
  IsArray 
} from 'class-validator';
import { PlanStatus, PlanType } from '@prisma/client';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreatePlanDto {
  @ApiProperty({ example: 'Premium Plan', description: 'Title of the subscription plan' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'This plan includes unlimited access to all features.', description: 'Description of the plan' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 49.99, description: 'Price of the plan in USD' })
  @IsNumber()
  price: number;

  @ApiProperty({ 
    example: ['Feature 1', 'Feature 2'], 
    description: 'List of features included in the plan', 
    type: [String] 
  })
  @IsArray()
  @IsString({ each: true })
  features: string[];

  @ApiProperty({ example: PlanType.MONTHLY, enum: PlanType, description: 'Type of the plan' })
  @IsEnum(PlanType)
  planType: PlanType;

  @ApiProperty({ example: PlanStatus.ACTIVE, enum: PlanStatus, description: 'Current status of the plan' })
  @IsEnum(PlanStatus)
  status: PlanStatus;

  // @ApiProperty({ example: '2025-12-31T23:59:59.000Z', description: 'Expiration date of the plan (ISO format)' })
  // @IsDateString()
  // endDate: string;

  // @ApiProperty({ example: true, description: 'Indicates whether the plan is currently active' })
  // @IsBoolean()
  // isActive: boolean;

  // @ApiProperty({ example: 'user_12345', description: 'ID of the user who owns this plan' })
  // @IsString()
  // userId: string;
}

export class UpdatePlanDto extends PartialType(CreatePlanDto) {}
