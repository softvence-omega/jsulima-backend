import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateCheckoutDto {
  @ApiProperty({example: 'eiqufhoqiehfwrdgfw'})
  @IsString()
  userId: string;

  @ApiProperty({example: 'waefwergewthtrg'})
  @IsString()
  planId: string;

  @ApiProperty({example: '100'})
  @IsNumber()
  amount: number;
}
