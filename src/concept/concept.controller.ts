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
import { ConceptService } from './concept.service';
import { CreateConceptDto } from './dto/create-concept.dto';
import { UpdateConceptDto } from './dto/update-concept.dto';
import { isNotANumber } from 'src/utils/is-not-a-number';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Concepto')
@Controller('concept')
export class ConceptController {
  constructor(private readonly conceptService: ConceptService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'El concepto se crea correctamente.',
  })
  @ApiBadRequestResponse({
    description: 'Los datos de entrada no son validos o estan vacios.',
  })
  @ApiNotFoundResponse({
    description: 'El id de Factura ingresado no se encuentra.',
  })
  create(@Body() body: CreateConceptDto) {
    return this.conceptService.create(body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'La solicitud fue procesada correctamente.' })
  @ApiNotFoundResponse({ description: 'No se encontraron resultados.' })
  findAll() {
    return this.conceptService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'La solicitud fue procesada correctamente.' })
  @ApiBadRequestResponse({ description: 'El id no es un número.' })
  @ApiNotFoundResponse({
    description: 'El contenido solicitado no se encuentra',
  })
  findOne(@Param('id') id: string) {
    isNotANumber(id);
    return this.conceptService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'La solicitud fue procesada correctamente.' })
  @ApiBadRequestResponse({ description: 'El id no es un número.' })
  @ApiNotFoundResponse({
    description: 'El contenido solicitado no se encuentra.',
  })
  update(@Param('id') id: string, @Body() body: UpdateConceptDto) {
    isNotANumber(id);
    return this.conceptService.update(+id, body);
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
    return this.conceptService.remove(+id);
  }
}
