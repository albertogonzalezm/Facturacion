import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { InvoiceService } from './invoice.service';
import { Invoice } from './entities/invoice.entity';
import { ThirdPartyInvoiced } from '../third-party-invoiced/entities/third-party-invoiced.entity';
import { NotFoundException } from '@nestjs/common';

describe('InvoiceService', () => {
  let service: InvoiceService;
  let invoiceRepo: Repository<Invoice>;
  let thirdPartyInvoiceRepo: Repository<ThirdPartyInvoiced>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoiceService,
        {
          provide: 'INVOICE',
          useValue: {
            create: jest.fn().mockResolvedValue([]),
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue([]),
            findOneAndGetConcepts: jest.fn().mockResolvedValue([]),
            update: jest.fn().mockResolvedValue([]),
            remove: jest.fn().mockResolvedValue([]),
          },
        },
        {
          provide: 'THIRD_PARTY_INVOICED',
          useValue: {
            findOne: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    service = module.get<InvoiceService>(InvoiceService);
    invoiceRepo = module.get('INVOICE');
    thirdPartyInvoiceRepo = module.get('THIRD_PARTY_INVOICED');
  });

  /* it('should be defined', () => {
    expect(service).toBeDefined();
  }); */

  describe('create', () => {
    it('Deberia devolver la factura creada', async () => {
      const testInputData = {
        number: '1234',
        date_of_issue: new Date(),
        total: 9.99,
        third_party_invoiced_id: 1,
      };
      const testResult = { ...testInputData, id: 1 };

      invoiceRepo.save = jest.fn().mockResolvedValue(testResult);
      const result = await service.create(testInputData);

      expect(invoiceRepo.save).toHaveBeenCalledWith(testInputData);

      expect(result.number).toEqual(testInputData.number);
      expect(result.date_of_issue).toEqual(testInputData.date_of_issue);
      expect(result.total).toEqual(testInputData.total);
      expect(result.third_party_invoiced_id).toEqual(
        testInputData.third_party_invoiced_id,
      );
    });

    it('Deberia devolver una excepcion si el Tercero Facturado no se encuentra', async () => {
      const testInputData = {
        number: '1234',
        date_of_issue: new Date(),
        total: 9.99,
        third_party_invoiced_id: 1,
      };

      thirdPartyInvoiceRepo.findOne = jest.fn().mockResolvedValue(null);

      try {
        await service.create(testInputData);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          `No se encontró el Tercero Facturado con id ${testInputData.third_party_invoiced_id}`,
        );
      }
    });
  });

  describe('findAll', () => {
    it('Deberia devolver una lista de facturas', async () => {
      const testResult = [
        {
          id: 1,
          number: '1234',
          date_of_issue: new Date(),
          total: 9.99,
          third_party_invoiced_id: 1,
        },
      ];
      invoiceRepo.find = jest.fn().mockResolvedValue(testResult);
      const result = await service.findAll();

      expect(result).toEqual(testResult);
    });

    it('Deberia devolver una excepcion si no encuentra ninguna factura', async () => {
      invoiceRepo.find = jest.fn().mockResolvedValue([]);

      try {
        await service.findAll();
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('No se encontró ninguna Factura');
      }
    });
  });

  describe('findOne', () => {
    it('Deberia devolver una factura', async () => {
      const testId = 1;
      const testResult = {
        id: testId,
        number: '1234',
        date_of_issue: new Date(),
        total: 9.99,
        third_party_invoiced_id: 1,
      };
      invoiceRepo.findOne = jest.fn().mockResolvedValue(testResult);
      const result = await service.findOne(testId);

      expect(invoiceRepo.findOne).toHaveBeenCalledWith({
        where: { id: testId },
      });
      expect(result).toEqual(testResult);
    });

    it('Deberia devolver una excepcion si no encuentra la factura', async () => {
      const testId = 1;

      invoiceRepo.findOne = jest.fn().mockResolvedValue(null);

      try {
        await service.findOne(testId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('No se encontró la Factura solicitada');
      }
    });
  });

  describe('findOneAndGetConcepts', () => {
    it('Deberia devolver una factura y la lista de conceptos asociados a ella', async () => {
      const testId = 1;
      const testResult = {
        id: testId,
        number: '1234',
        data_of_issue: new Date(),
        total: 9.99,
        third_party_invoiced_id: 1,
        concepts: [],
      };
      invoiceRepo.findOne = jest.fn().mockResolvedValue(testResult);
      const result = await service.findOneAndGetConcepts(testId);

      expect(invoiceRepo.findOne).toHaveBeenCalledWith({
        where: { id: testId },
        relations: { concepts: true },
      });
      expect(result).toEqual(testResult);
    });

    it('Deberia devolver una excepcion si no encuentra la factura', async () => {
      const testId = 1;

      invoiceRepo.findOne = jest.fn().mockResolvedValue(null);

      try {
        await service.findOneAndGetConcepts(testId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('No se encontró la Factura solicitada');
      }
    });
  });

  describe('update', () => {
    it('Deberia devoler un mensaje de confirmacion', async () => {
      const testId = 1;
      const testInputData = {
        number: '4321',
      };

      invoiceRepo.update = jest.fn().mockResolvedValue({ affected: 1 });
      const result = await service.update(testId, testInputData);

      expect(invoiceRepo.update).toHaveBeenCalledWith(testId, testInputData);
      expect(result).toEqual(`La Factura con id ${testId} ha sido actualizada`);
    });

    it('Deberia devolver una excepcion si no encuentra la factura que se quiere actualizar', async () => {
      const testId = 1;
      const testInputData = {
        number: '4321',
      };

      invoiceRepo.update = jest.fn().mockResolvedValue({ affected: 0 });

      try {
        await service.update(testId, testInputData);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          `No se pudo actualizar la Factura con id ${testId} porque no fue encontrada`,
        );
      }
    });
  });

  describe('remove', () => {
    it('No deberia devolver una respuesta', async () => {
      const testId = 1;
      const mockDelete = jest.fn();

      invoiceRepo.delete = mockDelete.mockResolvedValue({ affected: 1 });
      await service.remove(testId);

      expect(mockDelete).toHaveBeenCalledWith(testId);
    });

    it('Deberia devolver una excepcion si no encuentra la factura que se quiere eliminar', async () => {
      const testId = 1;

      invoiceRepo.delete = jest.fn().mockResolvedValue({ affected: 0 });

      try {
        await service.remove(testId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          'No se pudo encontrar la Factura o fue eliminado con anterioridad',
        );
      }
    });
  });
});
