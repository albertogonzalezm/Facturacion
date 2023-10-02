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
import { isNotANumber } from '../utils/is-not-a-number';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Factura')
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'La Factura se crea correctamente.',
  })
  @ApiBadRequestResponse({
    description: 'Los datos de entrada no son validos o estan vacios.',
  })
  @ApiNotFoundResponse({
    description: 'El id de Tercero Facturado ingresado no se encuentra.',
  })
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(createInvoiceDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'La solicitud fue procesada correctamente.' })
  @ApiNotFoundResponse({ description: 'No se encontraron resultados.' })
  findAll() {
    return this.invoiceService.findAll();
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
    return this.invoiceService.findOne(+id);
  }

  @Get(':id/concepts')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'La solicitud fue procesada correctamente.' })
  @ApiBadRequestResponse({ description: 'El id no es un número.' })
  @ApiNotFoundResponse({
    description: 'El contenido solicitado no se encuentra.',
  })
  findOneAndGetConcepts(@Param('id') id: string) {
    isNotANumber(id);
    return this.invoiceService.findOneAndGetConcepts(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'La solicitud fue procesada correctamente.' })
  @ApiBadRequestResponse({ description: 'El id no es un número.' })
  @ApiNotFoundResponse({
    description: 'El contenido solicitado no se encuentra.',
  })
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    isNotANumber(id);
    return this.invoiceService.update(+id, updateInvoiceDto);
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
    return this.invoiceService.remove(+id);
  }
}
