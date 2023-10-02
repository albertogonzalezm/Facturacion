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
import { isNotANumber } from '../utils/is-not-a-number';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Detalles De Factura')
@Controller('invoice_detail')
export class InvoiceDetailController {
  constructor(private readonly invoiceDetailService: InvoiceDetailService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'El Detalle de factura se crea correctamente.',
  })
  @ApiBadRequestResponse({
    description: 'Los datos de entrada no son validos o estan vacios.',
  })
  @ApiNotFoundResponse({
    description: 'El id de Concepto y/o Factura ingresado no se encuentra.',
  })
  create(@Body() body: CreateInvoiceDetailDto) {
    return this.invoiceDetailService.create(body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'La solicitud fue procesada correctamente.' })
  @ApiNotFoundResponse({ description: 'No se encontraron resultados.' })
  findAll() {
    return this.invoiceDetailService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'La solicitud fue procesada correctamente.' })
  @ApiBadRequestResponse({ description: 'El id no es un número.' })
  @ApiNotFoundResponse({
    description: 'El contenido solicitado no se encuentra.',
  })
  findOne(@Param('id') id: string) {
    isNotANumber(id);
    return this.invoiceDetailService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'La solicitud fue procesada correctamente.' })
  @ApiBadRequestResponse({ description: 'El id no es un número.' })
  @ApiNotFoundResponse({
    description: 'El contenido solicitado no se encuentra.',
  })
  update(@Param('id') id: string, @Body() body: UpdateInvoiceDetailDto) {
    isNotANumber(id);
    return this.invoiceDetailService.update(+id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description:
      'La solicitud fue procesada correctamente pero en este caso no devolvera una respuesta.',
  })
  @ApiBadRequestResponse({ description: 'El id no es un número.' })
  @ApiNotFoundResponse({
    description: 'El contenido solicitado no se encuentra.',
  })
  remove(@Param('id') id: string) {
    isNotANumber(id);
    return this.invoiceDetailService.remove(+id);
  }
}
