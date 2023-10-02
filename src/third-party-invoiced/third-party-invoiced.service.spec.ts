import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ThirdPartyInvoicedService } from './ThirdPartyInvoiced.service';
import { ThirdPartyInvoiced } from './entities/third-party-invoiced.entity';
import { Repository } from 'typeorm';
import { thirdPartyInvoicedProvider } from './third-party-invoiced.provider';
import { ThirdPartyInvoicedModule } from './third-party-invoiced.module';

describe('ThirdPartyInvoicedService', () => {
  let service: ThirdPartyInvoicedService;
  let thirdPartyInvoicedRespository: Repository<ThirdPartyInvoiced>;

  const TPI_REPOSITORY_TOKEN = getRepositoryToken(ThirdPartyInvoiced);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ThirdPartyInvoicedService,
        {
          provide: TPI_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ThirdPartyInvoicedService>(ThirdPartyInvoicedService);
    thirdPartyInvoicedRespository =
      module.get<Repository<ThirdPartyInvoiced>>(TPI_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('thirdPartyInvoicedRepository should be defined', () => {
    expect(thirdPartyInvoicedRespository).toBeDefined();
  });
});
