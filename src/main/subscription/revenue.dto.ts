import { ApiProperty } from '@nestjs/swagger';

export class RevenueDto {
  @ApiProperty({ example: 2500.75, description: 'Total revenue for the current month' })
  currentMonthRevenue: number;

  @ApiProperty({ example: 10000.50, description: 'Total revenue from all time' })
  allTimeRevenue: number;
}
