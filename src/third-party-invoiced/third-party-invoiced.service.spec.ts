import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { ThirdPartyInvoicedService } from './ThirdPartyInvoiced.service';
import { ThirdPartyInvoiced } from './entities/third-party-invoiced.entity';
import { NotFoundException } from '@nestjs/common';

describe('ThirdPartyInvoicedService', () => {
  let service: ThirdPartyInvoicedService;
  let repo: Repository<ThirdPartyInvoiced>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ThirdPartyInvoicedService,
        {
          provide: 'THIRD_PARTY_INVOICED',
          useValue: {
            create: jest.fn().mockResolvedValue([]),
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue([]),
            findOneAndGetInvoices: jest.fn().mockResolvedValue([]),
            update: jest.fn().mockResolvedValue([]),
            remove: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    service = module.get<ThirdPartyInvoicedService>(ThirdPartyInvoicedService);
    repo = module.get('THIRD_PARTY_INVOICED');
  });

  /* it('should be defined', () => {
    expect(service).toBeDefined();
  }); */

  describe('create', () => {
    it('Deberia guardar y devolver el Tercero Facturado', async () => {
      const testInputData = {
        name: 'Alberto',
        address: 'El Carmen, Barranquilla, 080012',
        phone: '(+57) 3001234567',
      };
      const testResult = { ...testInputData, id: 1 };

      repo.save = jest.fn().mockResolvedValue(testResult);
      const result = await service.create(testInputData);

      expect(repo.save).toHaveBeenCalledWith(testInputData);

      expect(result.name).toEqual(testInputData.name);
      expect(result.address).toEqual(testInputData.address);
      expect(result.phone).toEqual(testInputData.phone);
    });
  });

  describe('findAll', () => {
    it('Deberia devolver una lista de Terceros Facturados', async () => {
      const testResult = [
        {
          id: 1,
          name: 'Alberto',
          address: 'El Carmen, Barranquilla, 080012',
          phone: '(+57) 3001234567',
        },
      ];
      repo.find = jest.fn().mockResolvedValue(testResult);
      const result = await service.findAll();

      expect(repo.find).toHaveBeenCalledWith();
      expect(result).toEqual(testResult);
    });

    it('Deberia devolver una excepcion si no encuentra ningun Tercero Facturado', async () => {
      repo.find = jest.fn().mockResolvedValue([]);

      try {
        await service.findAll();
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          'No se encontró ningun Tercero Facturado',
        );
      }
    });
  });

  describe('findOne', () => {
    it('Deberia devolver un Tercero Facturado', async () => {
      const testId = 1;
      const testResult = {
        id: testId,
        name: 'Alberto',
        address: 'El Carmen, Barranquilla, 080012',
        phone: '(+57) 3001234567',
      };
      repo.findOne = jest.fn().mockResolvedValue(testResult);
      const result = await service.findOne(testId);

      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: testId } });
      expect(result).toEqual(testResult);
    });

    it('Deberia devolver una excepcion si no encuentra el Tercero Facturado', async () => {
      const testId = 1;

      repo.findOne = jest.fn().mockResolvedValue(null);

      try {
        await service.findOne(testId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          'No se encontró el Tercero Facturado solicitado',
        );
      }
    });
  });

  describe('findOneAndGetInvoices', () => {
    it('Deberia devolver un Tercero Facturado y la lista de Facturas asociados a él', async () => {
      const testId = 1;
      const testResult = {
        id: testId,
        name: 'Alberto',
        address: 'El Carmen, Barranquilla, CA 080012',
        phone: '(+57) 3001234567',
        invoices: [
          {
            id: 1,
            number: '1234',
            data_of_issue: '2023-10-02',
            total: 9.99,
            third_party_invoiced_id: 1,
          },
        ],
      };
      repo.findOne = jest.fn().mockResolvedValue(testResult);
      const result = await service.findOneAndGetInvoices(testId);

      expect(repo.findOne).toHaveBeenCalledWith({
        where: { id: testId },
        relations: { invoices: true },
      });
      expect(result).toEqual(testResult);
    });

    it('Deberia devolver una excepcion si no encuentra el Tercero Facturado', async () => {
      const testId = 1;

      repo.findOne = jest.fn().mockResolvedValue(null);

      try {
        await service.findOneAndGetInvoices(testId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          'No se encontró el Tercero Facturado solicitado',
        );
      }
    });
  });

  describe('update', () => {
    it('Deberia devoler un mensaje de confirmacion', async () => {
      const testId = 1;
      const testInputData = {
        name: 'Amanda',
      };

      repo.update = jest.fn().mockResolvedValue({ affected: 1 });
      const result = await service.update(testId, testInputData);

      expect(repo.update).toHaveBeenCalledWith(testId, testInputData);
      expect(result).toEqual(
        `El Tercero Facturado con id ${testId} ha sido actualizado`,
      );
    });

    it('Deberia devolver una excepcion si no encuentra el Tercero Facturado que se quiere actualizar', async () => {
      const testId = 1;
      const testData = {
        name: 'Amanda',
      };

      repo.update = jest.fn().mockResolvedValue({ affected: 0 });

      try {
        await service.update(testId, testData);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          `No se pudo actualizar el Tercero Facturado con id ${testId} porque no fue encontrado`,
        );
      }
    });
  });

  describe('remove', () => {
    it('No deberia devolver una respuesta', async () => {
      const testId = 1;
      const mockDelete = jest.fn();

      repo.delete = mockDelete.mockResolvedValue({ affected: 1 });
      await service.remove(testId);

      expect(mockDelete).toHaveBeenCalledWith(testId);
    });

    it('Deberia devolver una excepcion si no encuentra el Tercero Facturado que se quiere eliminar', async () => {
      const testId = 1;

      repo.delete = jest.fn().mockResolvedValue({ affected: 0 });

      try {
        await service.remove(testId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          'No se pudo encontrar el recurso o fue eliminado con anterioridad',
        );
      }
    });
  });
});
