import { Test, TestingModule } from '@nestjs/testing';
import { ConceptService } from './concept.service';
import { Concept } from './entities/concept.entity';
import { Repository } from 'typeorm';
import { Invoice } from '../invoice/entities/invoice.entity';
import { NotFoundException } from '@nestjs/common';

describe('ConceptService', () => {
  let service: ConceptService;
  let conceptRepo: Repository<Concept>;
  let invoiceRepo: Repository<Invoice>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConceptService,
        {
          provide: 'CONCEPT',
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
      ],
    }).compile();

    service = module.get<ConceptService>(ConceptService);
    conceptRepo = module.get('CONCEPT');
    invoiceRepo = module.get('INVOICE');
  });

  /* it('should be defined', () => {
    expect(service).toBeDefined();
  }); */

  describe('create', () => {
    it('Deberia devolver el concepto creado', async () => {
      const testInputData = {
        description: 'Laptop',
        unit_price: 649.99,
        quantity: 2,
        invoice_id: 1,
      };
      const testResult = { ...testInputData, id: 1 };

      conceptRepo.save = jest.fn().mockResolvedValue(testResult);
      const result = await service.create(testInputData);

      expect(conceptRepo.save).toHaveBeenCalledWith(testInputData);

      expect(result.description).toEqual(testInputData.description);
      expect(result.unit_price).toEqual(testInputData.unit_price);
      expect(result.quantity).toEqual(testInputData.quantity);
      expect(result.invoice_id).toEqual(testInputData.invoice_id);
    });

    it('Deberia devolver una excepcion si la factura no se encuentra', async () => {
      const testInputData = {
        description: 'Laptop',
        unit_price: 3.98,
        quantity: 2,
        invoice_id: 1,
      };

      invoiceRepo.findOne = jest.fn().mockResolvedValue(null);

      try {
        await service.create(testInputData);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          `No se encontró la Factura con id ${testInputData.invoice_id}`,
        );
      }
    });
  });

  describe('findAll', () => {
    it('Deberia devolver una lista de conceptos', async () => {
      const testResult = [
        {
          id: 1,
          description: 'Laptop',
          unit_price: 649.99,
          quantity: 2,
          invoice_id: 1,
        },
      ];
      conceptRepo.find = jest.fn().mockResolvedValue(testResult);
      const result = await service.findAll();

      expect(result).toEqual(testResult);
    });

    it('Deberia devolver una excepcion si no encuentra ningun concepto', async () => {
      conceptRepo.find = jest.fn().mockResolvedValue([]);

      try {
        await service.findAll();
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('No se encontró ningun Concepto');
      }
    });
  });

  describe('findOne', () => {
    it('Deberia devolver un concepto', async () => {
      const testId = 1;
      const testResult = {
        id: testId,
        description: 'Laptop',
        unit_price: 649.99,
        quantity: 2,
        invoice_id: 1,
      };
      conceptRepo.findOne = jest.fn().mockResolvedValue(testResult);
      const result = await service.findOne(testId);

      expect(conceptRepo.findOne).toHaveBeenCalledWith({
        where: { id: testId },
      });
      expect(result).toEqual(testResult);
    });

    it('Deberia devolver una excepcion si no encuentra el concepto', async () => {
      const testId = 1;

      conceptRepo.findOne = jest.fn().mockResolvedValue(null);

      try {
        await service.findOne(testId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('No se encontró el Concepto solicitado');
      }
    });
  });

  describe('update', () => {
    it('Deberia devoler un mensaje de confirmacion', async () => {
      const testId = 1;
      const testInputData = {
        unit_price: 649.99,
      };

      conceptRepo.update = jest.fn().mockResolvedValue({ affected: 1 });
      const result = await service.update(testId, testInputData);

      expect(conceptRepo.update).toHaveBeenCalledWith(testId, testInputData);
      expect(result).toEqual(
        `El Concepto con id ${testId} ha sido actualizado`,
      );
    });

    it('Deberia devolver una excepcion si no encuentra el concepto que se quiere actualizar', async () => {
      const testId = 1;
      const testInputData = {
        unit_price: 649.99,
      };

      conceptRepo.update = jest.fn().mockResolvedValue({ affected: 0 });

      try {
        await service.update(testId, testInputData);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          `No se pudo actualizar el Concepto con id ${testId} porque no fue encontrado`,
        );
      }
    });
  });

  describe('remove', () => {
    it('No deberia devolver una respuesta', async () => {
      const testId = 1;
      const mockDelete = jest.fn();

      conceptRepo.delete = mockDelete.mockResolvedValue({ affected: 1 });
      await service.remove(testId);

      expect(mockDelete).toHaveBeenCalledWith(testId);
    });

    it('Deberia devolver una excepcion si no encuentra el concepto que se quiere eliminar', async () => {
      const testId = 1;

      conceptRepo.delete = jest.fn().mockResolvedValue({ affected: 0 });

      try {
        await service.remove(testId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          'No se pudo encontrar el Concepto o fue eliminado con anterioridad',
        );
      }
    });
  });
});
