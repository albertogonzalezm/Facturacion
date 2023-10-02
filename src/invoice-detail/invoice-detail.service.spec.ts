import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceDetailService } from './invoice-detail.service';
import { Concept } from '../concept/entities/concept.entity';
import { Invoice } from '../invoice/entities/invoice.entity';
import { Repository } from 'typeorm';
import { InvoiceDetail } from './entities/invoice-detail.entity';
import { NotFoundException } from '@nestjs/common';

describe('InvoiceDetailService', () => {
  let service: InvoiceDetailService;
  let invoiceDetailRepo: Repository<InvoiceDetail>;
  let invoiceRepo: Repository<Invoice>;
  let conceptRepo: Repository<Concept>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoiceDetailService,
        {
          provide: 'INVOICE_DETAIL',
          useValue: {
            create: jest.fn().mockResolvedValue([]),
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue([]),
            update: jest.fn().mockResolvedValue([]),
            remove: jest.fn().mockResolvedValue([]),
          },
        },
        {
          provide: 'INVOICE',
          useValue: {
            findOne: jest.fn().mockResolvedValue([]),
          },
        },
        {
          provide: 'CONCEPT',
          useValue: {
            findOne: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    service = module.get<InvoiceDetailService>(InvoiceDetailService);
    invoiceDetailRepo = module.get('INVOICE_DETAIL');
    invoiceRepo = module.get('INVOICE');
    conceptRepo = module.get('CONCEPT');
  });

  /* it('should be defined', () => {
    expect(service).toBeDefined();
  }); */

  describe('create', () => {
    it('Deberia devolver el detalle de factura creado', async () => {
      const testInputData = {
        invoice_id: 1,
        concept_id: 1,
        quantity: 2,
      };
      const testResult = { ...testInputData, id: 1 };

      invoiceDetailRepo.save = jest.fn().mockResolvedValue(testResult);
      const result = await service.create(testInputData);

      expect(invoiceDetailRepo.save).toHaveBeenCalledWith(testInputData);

      expect(result.invoice_id).toEqual(testInputData.invoice_id);
      expect(result.concept_id).toEqual(testInputData.concept_id);
      expect(result.quantity).toEqual(testInputData.quantity);
    });

    it('Deberia devolver una excepcion si la factura no se encuentra', async () => {
      const testInputData = {
        invoice_id: 1,
        concept_id: 1,
        quantity: 2,
      };

      invoiceRepo.findOne = jest.fn().mockResolvedValue(null);

      try {
        await service.create(testInputData);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          `No se encontro la Factura con id ${testInputData.invoice_id}`,
        );
      }
    });

    it('Deberia devolver una excepcion si el concepto no se encuentra', async () => {
      const testInputData = {
        invoice_id: 1,
        concept_id: 1,
        quantity: 2,
      };

      conceptRepo.findOne = jest.fn().mockResolvedValue(null);

      try {
        await service.create(testInputData);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          `No se encontro el Concepto con id ${testInputData.concept_id}`,
        );
      }
    });
  });

  describe('findAll', () => {
    it('Deberia devolver una lista de detalles de facturas', async () => {
      const testResult = [
        {
          id: 1,
          invoice_id: 1,
          concept_id: 1,
          quantity: 2,
        },
      ];
      invoiceDetailRepo.find = jest.fn().mockResolvedValue(testResult);
      const result = await service.findAll();

      expect(result).toEqual(testResult);
    });

    it('Deberia devolver una excepcion si no encuentra ningun detalle de factura', async () => {
      invoiceDetailRepo.find = jest.fn().mockResolvedValue([]);

      try {
        await service.findAll();
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('No se encontraron Detalles de Facturas');
      }
    });
  });

  describe('findOne', () => {
    it('Deberia devolver un detalle de factura', async () => {
      const testId = 1;
      const testResult = {
        id: testId,
        invoice_id: 1,
        concept_id: 1,
        quantity: 2,
      };
      invoiceDetailRepo.findOne = jest.fn().mockResolvedValue(testResult);
      const result = await service.findOne(testId);

      expect(invoiceDetailRepo.findOne).toHaveBeenCalledWith({
        where: { id: testId },
      });
      expect(result).toEqual(testResult);
    });

    it('Deberia devolver una excepcion si no encuentra el detalle de factura', async () => {
      const testId = 1;

      invoiceDetailRepo.findOne = jest.fn().mockResolvedValue(null);

      try {
        await service.findOne(testId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          'No se encontró Detalle De Factura solicitado',
        );
      }
    });
  });

  describe('update', () => {
    it('Deberia devoler un mensaje de confirmacion', async () => {
      const testId = 1;
      const testInputData = {
        quantity: 3,
      };

      invoiceDetailRepo.update = jest.fn().mockResolvedValue({ affected: 1 });
      const result = await service.update(testId, testInputData);

      expect(invoiceDetailRepo.update).toHaveBeenCalledWith(
        testId,
        testInputData,
      );
      expect(result).toEqual(
        `El Detalle De Factura con id ${testId} ha sido actualizado`,
      );
    });

    it('Deberia devolver una excepcion si no encuentra el detalle de factura que se quiere actualizar', async () => {
      const testId = 1;
      const testInputData = {
        quantity: 3,
      };

      invoiceDetailRepo.update = jest.fn().mockResolvedValue({ affected: 0 });

      try {
        await service.update(testId, testInputData);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          `No se pudo actualizar Detalle De Factura con id ${testId} porque no fue encontrado`,
        );
      }
    });
  });

  describe('remove', () => {
    it('No deberia devolver una respuesta', async () => {
      const testId = 1;
      const mockDelete = jest.fn();

      invoiceDetailRepo.delete = mockDelete.mockResolvedValue({ affected: 1 });
      await service.remove(testId);

      expect(mockDelete).toHaveBeenCalledWith(testId);
    });

    it('Deberia devolver una excepcion si no encuentra el detalle de factura que se quiere eliminar', async () => {
      const testId = 1;

      invoiceDetailRepo.delete = jest.fn().mockResolvedValue({ affected: 0 });

      try {
        await service.remove(testId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          'No se pudo encontrar el Detalle De Factura o fue eliminado con anterioridad',
        );
      }
    });
  });
});
