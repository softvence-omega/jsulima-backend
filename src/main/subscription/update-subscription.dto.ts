import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSubscriptionDto {
  @ApiPropertyOptional({ example: 'userId123' })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiPropertyOptional({ example: 'premium' })
  @IsOptional()
  @IsString()
  planType?: string;

  @ApiPropertyOptional({ example: '2025-05-15T00:00:00.000Z' })
  @IsOptional()
  startDate?: Date;

  @ApiPropertyOptional({ example: '2025-11-15T00:00:00.000Z' })
  @IsOptional()
  endDate?: Date;
}
