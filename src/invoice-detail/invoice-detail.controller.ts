import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { InvoiceDetailService } from './invoice-detail.service';
import { CreateInvoiceDetailDto } from './dto/create-invoice-detail.dto';
import { UpdateInvoiceDetailDto } from './dto/update-invoice-detail.dto';
import { isNotANumber } from 'src/utils/is-not-a-number';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Detalles De Factura')
@Controller('invoice_detail')
export class InvoiceDetailController {
  constructor(private readonly invoiceDetailService: InvoiceDetailService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateInvoiceDetailDto) {
    return this.invoiceDetailService.create(body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.invoiceDetailService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    isNotANumber(id);
    return this.invoiceDetailService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() body: UpdateInvoiceDetailDto) {
    isNotANumber(id);
    return this.invoiceDetailService.update(+id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    isNotANumber(id);
    return this.invoiceDetailService.remove(+id);
  }
}
