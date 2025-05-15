import {
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';
  import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
  import { PaymentStatus } from '@prisma/client';
  
  export class CreateSubscriptionDto {
    @ApiProperty({ description: 'ID of the user creating the subscription' })
    @IsString()
    @IsNotEmpty()
    userId: string;
  
    @ApiProperty({ description: 'ID of the plan being subscribed to' })
    @IsString()
    @IsNotEmpty()
    planId: string;
  
    @ApiProperty({ description: 'End date of the subscription', example: '2025-06-01T00:00:00.000Z' })
    @IsDateString()
    endDate: string;
  
    @ApiPropertyOptional({ description: 'Promo code ID if applied' })
    @IsString()
    @IsOptional()
    promoCodeId?: string;
  
    @ApiPropertyOptional({ enum: PaymentStatus, description: 'Payment status of the subscription' })
    @IsEnum(PaymentStatus)
    @IsOptional()
    paymentStatus?: PaymentStatus;
  
    @ApiPropertyOptional({ description: 'Stripe/Razorpay payment intent ID' })
    @IsString()
    @IsOptional()
    paymentIntentId?: string;
  
    @ApiPropertyOptional({ description: 'Payment method used (e.g., card, upi, paypal)' })
    @IsString()
    @IsOptional()
    paymentMethod?: string;
  
    @ApiPropertyOptional({ description: 'Date and time when the payment was completed', example: '2025-06-01T12:00:00.000Z' })
    @IsDateString()
    @IsOptional()
    paidAt?: string;
  
    @ApiPropertyOptional({ description: 'URL to the payment invoice or receipt' })
    @IsString()
    @IsOptional()
    invoiceUrl?: string;
  }
  