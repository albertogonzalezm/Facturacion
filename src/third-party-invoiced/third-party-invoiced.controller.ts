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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { isNotANumber } from 'src/utils/is-not-a-number';

@ApiTags('Tercero Facturado')
@Controller('third_party_invoiced')
export class ThirdPartyInvoicedController {
  constructor(
    private readonly thirdPartyInvoicedService: ThirdPartyInvoicedService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'El Tercero Facturado crea correctamente.',
  })
  @ApiBadRequestResponse({
    description: 'Los datos de entrada no son validos',
  })
  create(@Body() body: CreateThirdPartyInvoicedDto) {
    return this.thirdPartyInvoicedService.create(body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'La solicitud fue procesada correctamente' })
  @ApiNotFoundResponse({ description: 'No se encontraron resultados' })
  findAll() {
    return this.thirdPartyInvoicedService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'La solicitud fue procesada correctamente' })
  @ApiBadRequestResponse({ description: 'El id no es un número' })
  @ApiNotFoundResponse({
    description: 'El contenido solicitado no se encuentra',
  })
  findOne(@Param('id') id: string) {
    isNotANumber(id);
    return this.thirdPartyInvoicedService.findOne(+id);
  }

  @Get(':id/invoices')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'La solicitud fue procesada correctamente' })
  @ApiBadRequestResponse({ description: 'El id no es un número' })
  @ApiNotFoundResponse({
    description: 'El contenido solicitado no se encuentra',
  })
  findOneAndGetInvoices(@Param('id') id: string) {
    isNotANumber(id);
    return this.thirdPartyInvoicedService.findOneAndGetInvoices(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'La solicitud fue procesada correctamente' })
  @ApiBadRequestResponse({ description: 'El id no es un número' })
  @ApiNotFoundResponse({
    description: 'El contenido solicitado no se encuentra',
  })
  update(@Param('id') id: string, @Body() body: UpdateThirdPartyInvoicedDto) {
    isNotANumber(id);
    return this.thirdPartyInvoicedService.update(+id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description:
      'La solicitud fue procesada correctamente pero en este caso no devolvera una respuesta',
  })
  @ApiBadRequestResponse({ description: 'El id no es un número' })
  @ApiNotFoundResponse({
    description: 'El contenido solicitado no se encuentra',
  })
  remove(@Param('id') id: string) {
    isNotANumber(id);
    return this.thirdPartyInvoicedService.remove(+id);
  }
}
