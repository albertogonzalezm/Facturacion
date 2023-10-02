import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ThirdPartyInvoicedController } from './third-party-invoiced.controller';
import { ThirdPartyInvoicedService } from './ThirdPartyInvoiced.service';

describe('ThirdPartyInvoicedController', () => {
  let app: INestApplication;
  let service: ThirdPartyInvoicedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThirdPartyInvoicedController],
      providers: [
        {
          provide: ThirdPartyInvoicedService,
          useValue: {
            create: jest.fn().mockResolvedValue({}),
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            findOneAndGetInvoices: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue(''),
            remove: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    service = module.get<ThirdPartyInvoicedService>(ThirdPartyInvoicedService);
  });

  it('/POST third_party_invoiced', async () => {
    const body = {
      name: 'Alberto',
      address: 'El Carmen, Barranquilla, 080012',
      phone: '+57 3001234567',
    };
    const expectedResponse = await service.create(body);

    return request(app.getHttpServer())
      .post('/third_party_invoiced')
      .send(body)
      .expect(201)
      .expect(expectedResponse);
  });

  it('/GET third_party_invoiced', async () => {
    const expectedResponse = await service.findAll();
    return request(app.getHttpServer())
      .get('/third_party_invoiced')
      .expect(200)
      .expect(expectedResponse);
  });

  it('/GET third_party_invoiced/:id', async () => {
    const id = '1';
    const expectedResponse = await service.findOne(+id);
    return request(app.getHttpServer())
      .get(`/third_party_invoiced/${id}`)
      .expect(200)
      .expect(expectedResponse);
  });

  it('/GET third_party_invoiced/:id/invoices', async () => {
    const id = '1';
    const expectedResponse = await service.findOneAndGetInvoices(+id);
    return request(app.getHttpServer())
      .get(`/third_party_invoiced/${id}/invoices`)
      .expect(200)
      .expect(expectedResponse);
  });

  it('/PATCH third_party_invoiced/:id', async () => {
    const id = '1';
    const body = {
      name: 'Adrian',
    };
    const expectedResponse = await service.update(+id, body);
    return request(app.getHttpServer())
      .patch(`/third_party_invoiced/${id}`)
      .send(body)
      .expect(200)
      .expect(expectedResponse);
  });

  it('/DELETE third_party_invoiced/:id', () => {
    const id = '1';
    return request(app.getHttpServer())
      .delete(`/third_party_invoiced/${id}`)
      .expect(204);
  });

  // ! Bad Request Response
  it('/POST third_party_invoiced con datos de entrada no validos', () => {
    const body = {
      name: '',
      address: '',
      phone: '',
    };
    return request(app.getHttpServer())
      .post('/third_party_invoiced')
      .send(body)
      .expect(400);
  });

  it('/GET third_party_invoiced/:id cuando el id no es un numero entero', () => {
    const id = 'a';
    return request(app.getHttpServer())
      .get(`/third_party_invoiced/${id}`)
      .expect(400);
  });

  it('/GET third_party_invoiced/:id/invoices', async () => {
    const id = 'c';
    return request(app.getHttpServer())
      .get(`/third_party_invoiced/${id}/invoices`)
      .expect(400);
  });

  it('/PATCH third_party_invoiced/:id con datos de entrada no validos', () => {
    const id = '1';
    const body = {
      name: 22,
    };
    return request(app.getHttpServer())
      .patch(`/third_party_invoiced/${id}`)
      .send(body)
      .expect(400);
  });

  it('/DELETE third_party_invoiced/:id cuando el id no es un numero entero', () => {
    const id = 'b';
    return request(app.getHttpServer())
      .delete(`/third_party_invoiced/${id}`)
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
