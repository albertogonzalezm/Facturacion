import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateConceptDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: Number, format: 'decimal', minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  unit_price: number;

  @ApiProperty({ type: Number, format: 'int', minimum: 0 })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ type: Number, format: 'int', minimum: 1 })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  invoice_id: number;
}
