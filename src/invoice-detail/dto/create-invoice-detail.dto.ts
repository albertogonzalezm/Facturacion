import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateInvoiceDetailDto {
  @ApiProperty({ type: Number, format: 'int', minimum: 1 })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  invoice_id: number;

  @ApiProperty({ type: Number, format: 'int', minimum: 1 })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  concept_id: number;

  @ApiProperty({ type: Number, format: 'int', minimum: 0 })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  quantity: number;
}
