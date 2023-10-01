import { Test, TestingModule } from '@nestjs/testing';
import { ThirdPartyInvoicedService } from './ThirdPartyInvoiced.service';

describe('ThirdPartyInvoicedService', () => {
  let service: ThirdPartyInvoicedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThirdPartyInvoicedService],
    }).compile();

    service = module.get<ThirdPartyInvoicedService>(ThirdPartyInvoicedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
