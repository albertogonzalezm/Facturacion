import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateConceptDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: Number, format: 'decimal' })
  @IsNumber()
  @IsNotEmpty()
  unit_price: number;

  @ApiProperty({ type: Number, format: 'int' })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ type: Number, format: 'int' })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  invoice_id: number;
}
