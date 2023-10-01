import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateConceptDto } from './dto/create-concept.dto';
import { UpdateConceptDto } from './dto/update-concept.dto';
import { Concept } from './entities/concept.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConceptService {
  constructor(
    @Inject('INVOICE')
    private invoiceRepository: Repository<Invoice>,
    @Inject('CONCEPT') private conceptRepository: Repository<Concept>,
  ) {}

  async create(data: CreateConceptDto): Promise<Concept> {
    const invoiceFound = await this.invoiceRepository.findOne({
      where: { id: data.invoice_id },
    });

    if (!invoiceFound)
      throw new NotFoundException(
        `No se encontró el Concepto con id ${data.invoice_id}`,
      );

    return await this.conceptRepository.save(data);
  }

  async findAll(): Promise<Concept[]> {
    const conceptsFound = await this.conceptRepository.find();
    if (!conceptsFound.length)
      throw new NotFoundException('No se encontró ningun Concepto');
    return conceptsFound;
  }

  async findOne(id: number): Promise<Concept> {
    const conceptFound = await this.conceptRepository.findOne({
      where: { id },
    });
    if (!conceptFound)
      throw new NotFoundException('No se encontró el Concepto solicitado');
    return conceptFound;
  }

  async update(id: number, data: UpdateConceptDto): Promise<string> {
    const updated = await this.conceptRepository.update(id, data);
    if (!updated.affected)
      throw new NotFoundException(
        `No se pudo actualizar el Concepto con id ${id} porque no fue encontrado`,
      );
    return `El Concepto con id ${id} ha sido actualizado`;
  }

  async remove(id: number): Promise<void> {
    const del = await this.conceptRepository.delete(id);
    if (!del.affected)
      throw new NotFoundException(
        'No se pudo encontrar el Concepto o fue eliminado con anterioridad',
      );
  }
}
