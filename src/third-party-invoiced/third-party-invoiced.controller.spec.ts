import { Test, TestingModule } from '@nestjs/testing';
import { ThirdPartyInvoicedController } from './third-party-invoiced.controller';
import { ThirdPartyInvoicedService } from './ThirdPartyInvoiced.service';

describe('ThirdPartyInvoicedController', () => {
  let controller: ThirdPartyInvoicedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThirdPartyInvoicedController],
      providers: [ThirdPartyInvoicedService],
    }).compile();

    controller = module.get<ThirdPartyInvoicedController>(
      ThirdPartyInvoicedController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
