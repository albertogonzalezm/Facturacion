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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Concepto')
@Controller('concept')
export class ConceptController {
  constructor(private readonly conceptService: ConceptService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateConceptDto) {
    return this.conceptService.create(body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.conceptService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    isNotANumber(id);
    return this.conceptService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() body: UpdateConceptDto) {
    isNotANumber(id);
    return this.conceptService.update(+id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    isNotANumber(id);
    return this.conceptService.remove(+id);
  }
}
