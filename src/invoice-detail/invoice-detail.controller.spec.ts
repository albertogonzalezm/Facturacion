import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { InvoiceDetailController } from './invoice-detail.controller';
import { InvoiceDetailService } from './invoice-detail.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';

describe('InvoiceDetailController', () => {
  let app: INestApplication;
  let service: InvoiceDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceDetailController],
      providers: [
        {
          provide: InvoiceDetailService,
          useValue: {
            create: jest.fn().mockResolvedValue({}),
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue(''),
            remove: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    service = module.get<InvoiceDetailService>(InvoiceDetailService);
  });

  it('/POST invoice_detail', async () => {
    const body = {
      invoice_id: 1,
      concept_id: 1,
      quantity: 2,
    };
    const expectedResponse = await service.create(body);

    return request(app.getHttpServer())
      .post('/invoice_detail')
      .send(body)
      .expect(201)
      .expect(expectedResponse);
  });

  it('/GET invoice_detail', async () => {
    const expectedResponse = await service.findAll();
    return request(app.getHttpServer())
      .get('/invoice_detail')
      .expect(200)
      .expect(expectedResponse);
  });

  it('/GET invoice_detail/:id', async () => {
    const id = '1';
    const expectedResponse = await service.findOne(+id);
    return request(app.getHttpServer())
      .get(`/invoice_detail/${id}`)
      .expect(200)
      .expect(expectedResponse);
  });

  it('/PATCH invoice_detail/:id', async () => {
    const id = '1';
    const body = {
      quantity: 6,
    };
    const expectedResponse = await service.update(+id, body);
    return request(app.getHttpServer())
      .patch(`/invoice_detail/${id}`)
      .send(body)
      .expect(200)
      .expect(expectedResponse);
  });

  it('/DELETE invoice_detail/:id', () => {
    const id = '1';
    return request(app.getHttpServer())
      .delete(`/invoice_detail/${id}`)
      .expect(204);
  });

  // ! Bad Request
  it('/POST invoice_detail con datos de entrada no validos', () => {
    const body = {
      invoice_id: '',
      concept_id: '',
      quantity: '',
    };
    return request(app.getHttpServer())
      .post('/invoice_detail')
      .send(body)
      .expect(400);
  });

  it('/GET invoice_detail/:id cuando el id no es un numero entero', () => {
    const id = 'a';
    return request(app.getHttpServer())
      .get(`/invoice_detail/${id}`)
      .expect(400);
  });

  it('/PATCH invoice_detail/:id con datos de entrada no validos', () => {
    const id = '1';
    const body = {
      quantity: 'hola',
    };
    return request(app.getHttpServer())
      .patch(`/invoice_detail/${id}`)
      .send(body)
      .expect(400);
  });

  it('/DELETE invoice_detail/:id cuando el id no es un numero entero', () => {
    const id = 'b';
    return request(app.getHttpServer())
      .delete(`/invoice_detail/${id}`)
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
