import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateThirdPartyInvoicedDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  phone: string;
}
