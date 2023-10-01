import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateThirdPartyInvoicedDto } from './dto/create-third-party-invoiced.dto';
import { UpdateThirdPartyInvoicedDto } from './dto/update-third-party-invoiced.dto';
import { ThirdPartyInvoiced } from './entities/third-party-invoiced.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ThirdPartyInvoicedService {
  constructor(
    @Inject('THIRD_PARTY_INVOICED')
    private thirdPartyInvoicedRepository: Repository<ThirdPartyInvoiced>,
  ) {}

  async create(data: CreateThirdPartyInvoicedDto): Promise<ThirdPartyInvoiced> {
    return await this.thirdPartyInvoicedRepository.save(data);
  }

  async findAll(): Promise<ThirdPartyInvoiced[]> {
    const found = await this.thirdPartyInvoicedRepository.find();
    if (!found.length)
      throw new NotFoundException('No se encontró ningun Tercero Facturado');
    return found;
  }

  async findOne(id: number): Promise<ThirdPartyInvoiced> {
    const thirdPartyInvoicedFound =
      await this.thirdPartyInvoicedRepository.findOne({
        where: { id },
      });
    if (!thirdPartyInvoicedFound)
      throw new NotFoundException(
        'No se encontró el Tercero Facturado solicitado',
      );
    return thirdPartyInvoicedFound;
  }

  async findOneAndGetInvoices(id: number): Promise<ThirdPartyInvoiced> {
    const thirdPartyInvoicedFound =
      await this.thirdPartyInvoicedRepository.findOne({
        where: { id },
        relations: { invoices: true },
      });
    if (!thirdPartyInvoicedFound)
      throw new NotFoundException(
        'No se encontró el Tercero Facturado solicitado',
      );
    return thirdPartyInvoicedFound;
  }

  async update(id: number, data: UpdateThirdPartyInvoicedDto): Promise<string> {
    const updated = await this.thirdPartyInvoicedRepository.update(id, data);
    if (!updated.affected)
      throw new NotFoundException(
        `No se pudo actualizar el Tercero Facturado con id ${id} porque no fue encontrado`,
      );
    return `El Tercero Facturado con id ${id} ha sido actualizado`;
  }

  async remove(id: number): Promise<void> {
    const del = await this.thirdPartyInvoicedRepository.delete(id);
    if (!del.affected)
      throw new NotFoundException(
        'No se pudo encontrar el recurso o fue eliminado con anterioridad',
      );
  }
}
