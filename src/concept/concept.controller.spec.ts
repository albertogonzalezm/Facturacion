import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ConceptController } from './concept.controller';
import { ConceptService } from './concept.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';

describe('ConceptController', () => {
  let app: INestApplication;
  let service: ConceptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConceptController],
      providers: [
        {
          provide: ConceptService,
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
    service = module.get<ConceptService>(ConceptService);
  });

  it('/POST concepts', async () => {
    const body = {
      description: 'laptop',
      unit_price: 650.49,
      quantity: 1,
      invoice_id: 1,
    };
    const expectedResponse = await service.create(body);

    return request(app.getHttpServer())
      .post('/concepts')
      .send(body)
      .expect(201)
      .expect(expectedResponse);
  });

  it('/GET concepts', async () => {
    const expectedResponse = await service.findAll();
    return request(app.getHttpServer())
      .get('/concepts')
      .expect(200)
      .expect(expectedResponse);
  });

  it('/GET concepts/:id', async () => {
    const id = '1';
    const expectedResponse = await service.findOne(+id);
    return request(app.getHttpServer())
      .get(`/concepts/${id}`)
      .expect(200)
      .expect(expectedResponse);
  });

  it('/PATCH concepts/:id', async () => {
    const id = '1';
    const body = {
      quantity: 6,
    };
    const expectedResponse = await service.update(+id, body);
    return request(app.getHttpServer())
      .patch(`/concepts/${id}`)
      .send(body)
      .expect(200)
      .expect(expectedResponse);
  });

  it('/DELETE concepts/:id', () => {
    const id = '1';
    return request(app.getHttpServer()).delete(`/concepts/${id}`).expect(204);
  });

  // ! Bad Request
  it('/POST concept con datos de entrada no validos', () => {
    const body = {
      description: 8,
      unit_price: '',
    };
    return request(app.getHttpServer())
      .post('/concepts')
      .send(body)
      .expect(400);
  });

  it('/GET concepts/:id cuando el id no es un numero entero', () => {
    const id = 'a';
    return request(app.getHttpServer()).get(`/concepts/${id}`).expect(400);
  });

  it('/PATCH concepts/:id con datos de entrada no validos', () => {
    const id = '1';
    const body = {
      quantity: 'hola',
    };
    return request(app.getHttpServer())
      .patch(`/concepts/${id}`)
      .send(body)
      .expect(400);
  });

  it('/DELETE concepts/:id cuando el id no es un numero entero', () => {
    const id = 'bu8u';
    return request(app.getHttpServer()).delete(`/concepts/${id}`).expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
