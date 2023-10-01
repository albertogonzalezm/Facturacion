import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateInvoiceDetailDto {
  @ApiProperty({ type: Number, format: 'int' })
  @IsInt()
  @IsNotEmpty()
  invoice_id: number;

  @ApiProperty({ type: Number, format: 'int' })
  @IsInt()
  @IsNotEmpty()
  concept_id: number;

  @ApiProperty({ type: Number, format: 'int' })
  @IsInt()
  @IsNotEmpty()
  quantity: number;
}
