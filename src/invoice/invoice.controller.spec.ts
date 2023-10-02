import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';

describe('InvoiceController', () => {
  let app: INestApplication;
  let service: InvoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceController],
      providers: [
        {
          provide: InvoiceService,
          useValue: {
            create: jest.fn().mockResolvedValue({}),
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            findOneAndGetConcepts: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue(''),
            remove: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    service = module.get<InvoiceService>(InvoiceService);
  });

  it('/POST invoice', async () => {
    const body = {
      number: '1234',
      date_of_issue: new Date(),
      total: 10.09,
      third_party_invoiced_id: 1,
    };
    const expectedResponse = await service.create(body);

    return request(app.getHttpServer())
      .post('/invoice')
      .send(body)
      .expect(201)
      .expect(expectedResponse);
  });

  it('/GET invoice', async () => {
    const expectedResponse = await service.findAll();
    return request(app.getHttpServer())
      .get('/invoice')
      .expect(200)
      .expect(expectedResponse);
  });

  it('/GET invoice/:id', async () => {
    const id = '1';
    const expectedResponse = await service.findOne(+id);
    return request(app.getHttpServer())
      .get(`/invoice/${id}`)
      .expect(200)
      .expect(expectedResponse);
  });

  it('/GET invoice/:id/concepts', async () => {
    const id = '1';
    const expectedResponse = await service.findOne(+id);
    return request(app.getHttpServer())
      .get(`/invoice/${id}/concepts`)
      .expect(200)
      .expect(expectedResponse);
  });

  it('/PATCH invoice/:id', async () => {
    const id = '1';
    const body = {
      total: 20,
    };
    const expectedResponse = await service.update(+id, body);
    return request(app.getHttpServer())
      .patch(`/invoice/${id}`)
      .send(body)
      .expect(200)
      .expect(expectedResponse);
  });

  it('/DELETE invoice/:id', () => {
    const id = '1';
    return request(app.getHttpServer()).delete(`/invoice/${id}`).expect(204);
  });

  // ! Bad Request
  it('/POST invoice con datos de entrada no validos', () => {
    const body = {
      number: 1234,
      date_of_issue: new Date(),
      total: '10.09',
      third_party_invoiced_id: '',
    };
    return request(app.getHttpServer()).post('/invoice').send(body).expect(400);
  });

  it('/GET invoice/:id cuando el id no es un numero entero', () => {
    const id = 'x';
    return request(app.getHttpServer()).get(`/invoice/${id}`).expect(400);
  });

  it('/GET invoice/:id/concepts cuando el id no es un numero entero', () => {
    const id = 'x';
    return request(app.getHttpServer())
      .get(`/invoice/${id}/concepts`)
      .expect(400);
  });

  it('/PATCH invoice/:id con datos de entrada no validos', () => {
    const id = '1';
    const body = {
      date_of_issue: 1000,
    };
    return request(app.getHttpServer())
      .patch(`/invoice/${id}`)
      .send(body)
      .expect(400);
  });

  it('/DELETE invoice/:id cuando el id no es un numero entero', () => {
    const id = 'y';
    return request(app.getHttpServer()).delete(`/invoice/${id}`).expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
