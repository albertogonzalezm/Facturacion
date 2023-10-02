import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvoiceDetailDto } from './dto/create-invoice-detail.dto';
import { UpdateInvoiceDetailDto } from './dto/update-invoice-detail.dto';
import { Repository } from 'typeorm';
import { Invoice } from '../invoice/entities/invoice.entity';
import { Concept } from '../concept/entities/concept.entity';
import { InvoiceDetail } from './entities/invoice-detail.entity';

@Injectable()
export class InvoiceDetailService {
  constructor(
    @Inject('INVOICE')
    private invoiceRepository: Repository<Invoice>,
    @Inject('CONCEPT')
    private conceptRepository: Repository<Concept>,
    @Inject('INVOICE_DETAIL')
    private invoiceDetailRepository: Repository<InvoiceDetail>,
  ) {}

  async create(data: CreateInvoiceDetailDto) {
    const conceptFound = await this.conceptRepository.findOne({
      where: { id: data.concept_id },
    });
    if (!conceptFound)
      throw new NotFoundException(
        `No se encontro el Concepto con id ${data.concept_id}`,
      );

    const invoiceFound = await this.invoiceRepository.findOne({
      where: { id: data.invoice_id },
    });
    if (!invoiceFound)
      throw new NotFoundException(
        `No se encontro la Factura con id ${data.concept_id}`,
      );

    return await this.invoiceDetailRepository.save(data);
  }

  async findAll(): Promise<InvoiceDetail[]> {
    const invoiceDetailsFound = await this.invoiceDetailRepository.find();
    if (!invoiceDetailsFound.length)
      throw new NotFoundException('No se encontraron Detalles de Facturas');
    return invoiceDetailsFound;
  }

  async findOne(id: number): Promise<InvoiceDetail> {
    const invoiceDetailFound = await this.invoiceDetailRepository.findOne({
      where: { id },
    });
    if (!invoiceDetailFound)
      throw new NotFoundException(
        'No se encontró Detalle De Factura solicitado',
      );
    return invoiceDetailFound;
  }

  async update(id: number, data: UpdateInvoiceDetailDto): Promise<string> {
    const updated = await this.invoiceDetailRepository.update(id, data);
    if (!updated.affected)
      throw new NotFoundException(
        `No se pudo actualizar Detalle De Factura con id ${id} porque no fue encontrado`,
      );
    return `El Detalle De Factura con id ${id} ha sido actualizado`;
  }

  async remove(id: number): Promise<void> {
    const del = await this.invoiceDetailRepository.delete(id);
    if (!del.affected)
      throw new NotFoundException(
        'No se pudo encontrar el Detalle De Factura o fue eliminado con anterioridad',
      );
  }
}
