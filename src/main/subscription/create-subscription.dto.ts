import {
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';
  import { PaymentStatus } from '@prisma/client';
  
  export class CreateSubscriptionDto {
    @IsString()
    @IsNotEmpty()
    userId: string;
  
    @IsString()
    @IsNotEmpty()
    planId: string;
  
    @IsDateString()
    endDate: string;
  
    @IsString()
    @IsOptional()
    promoCodeId?: string;
  
    @IsEnum(PaymentStatus)
    @IsOptional()
    paymentStatus?: PaymentStatus;
  
    @IsString()
    @IsOptional()
    paymentIntentId?: string;
  
    @IsString()
    @IsOptional()
    paymentMethod?: string;
  
    @IsDateString()
    @IsOptional()
    paidAt?: string;
  
    @IsString()
    @IsOptional()
    invoiceUrl?: string;
  }
  