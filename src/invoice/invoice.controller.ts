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
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { isNotANumber } from 'src/utils/is-not-a-number';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Factura')
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(createInvoiceDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.invoiceService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    isNotANumber(id);
    return this.invoiceService.findOne(+id);
  }
  @Get(':id/concepts')
  @HttpCode(HttpStatus.OK)
  findOneAndGetConcepts(@Param('id') id: string) {
    isNotANumber(id);
    return this.invoiceService.findOneAndGetConcepts(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    isNotANumber(id);
    return this.invoiceService.update(+id, updateInvoiceDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    isNotANumber(id);
    return this.invoiceService.remove(+id);
  }
}
