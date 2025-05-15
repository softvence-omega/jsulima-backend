import { PartialType, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreatePromoCodeDto {
  @ApiProperty({
    example: 'SUMMER2025',
    description: 'The promotional code users can apply for a discount',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    example: 20,
    description: 'Discount percentage or amount the promo code provides',
  })
  @IsNumber()
  discount: number;

  @ApiProperty({
    example: '2025-08-31T23:59:59.000Z',
    description: 'Expiration date and time of the promo code in ISO format',
  })
  @IsDateString()
  expiresAt: string;

  @ApiPropertyOptional({
    example: 'user_12345',
    description: 'Optional user ID if the promo code is user-specific',
  })
  @IsOptional()
  @IsString()   
  userId?: string;
}

export class UpdatePromoCodeDto extends PartialType(CreatePromoCodeDto) {}
