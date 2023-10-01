import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { ThirdPartyInvoiced } from 'src/third-party-invoiced/entities/third-party-invoiced.entity';
import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @Inject('THIRD_PARTY_INVOICED')
    private thirdPartyInvoicedRepository: Repository<ThirdPartyInvoiced>,
    @Inject('INVOICE')
    private invoiceRepository: Repository<Invoice>,
  ) {}

  async create(data: CreateInvoiceDto) {
    const thirdPartyInvoicedFound =
      await this.thirdPartyInvoicedRepository.findOne({
        where: { id: data.third_party_invoiced_id },
      });

    if (!thirdPartyInvoicedFound)
      throw new NotFoundException(
        `No se encontró el Tercero Facturado con id ${data.third_party_invoiced_id}`,
      );

    return await this.invoiceRepository.save(data);
  }

  async findAll(): Promise<Invoice[]> {
    const found = await this.invoiceRepository.find();
    if (!found.length)
      throw new NotFoundException('No se encontró ninguna Factura');
    return found;
  }

  async findOne(id: number): Promise<Invoice> {
    const thirdPartyInvoicedFound = await this.invoiceRepository.findOne({
      where: { id },
    });
    if (!thirdPartyInvoicedFound)
      throw new NotFoundException('No se encontró la Factura solicitada');
    return thirdPartyInvoicedFound;
  }

  async update(id: number, data: UpdateInvoiceDto): Promise<string> {
    const updated = await this.invoiceRepository.update(id, data);
    if (!updated.affected)
      throw new NotFoundException(
        `No se pudo actualizar la Factura con id ${id} porque no fue encontrada`,
      );
    return `La Factura con id ${id} ha sido actualizada`;
  }

  async remove(id: number): Promise<void> {
    const del = await this.invoiceRepository.delete(id);
    if (!del.affected)
      throw new NotFoundException(
        'No se pudo encontrar el recurso o fue eliminado con anterioridad',
      );
  }
}
