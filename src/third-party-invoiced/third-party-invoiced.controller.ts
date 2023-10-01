import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ThirdPartyInvoicedService } from './ThirdPartyInvoiced.service';
import { CreateThirdPartyInvoicedDto } from './dto/create-third-party-invoiced.dto';
import { UpdateThirdPartyInvoicedDto } from './dto/update-third-party-invoiced.dto';
import { ApiTags } from '@nestjs/swagger';
import { isNotANumber } from 'src/utils/is-not-a-number';

@ApiTags('Tercero Facturado')
@Controller('third_party_invoiced')
export class ThirdPartyInvoicedController {
  constructor(
    private readonly thirdPartyInvoicedService: ThirdPartyInvoicedService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateThirdPartyInvoicedDto) {
    return this.thirdPartyInvoicedService.create(body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.thirdPartyInvoicedService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    isNotANumber(id);
    return this.thirdPartyInvoicedService.findOne(+id);
  }

  @Get(':id/invoices')
  @HttpCode(HttpStatus.OK)
  findOneAndGetInvoices(@Param('id') id: string) {
    isNotANumber(id);
    return this.thirdPartyInvoicedService.findOneAndGetInvoices(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() body: UpdateThirdPartyInvoicedDto) {
    isNotANumber(id);
    return this.thirdPartyInvoicedService.update(+id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    isNotANumber(id);
    return this.thirdPartyInvoicedService.remove(+id);
  }
}
