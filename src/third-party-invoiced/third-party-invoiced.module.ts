import { Module } from '@nestjs/common';
import { ThirdPartyInvoicedService } from './ThirdPartyInvoiced.service';
import { ThirdPartyInvoicedController } from './third-party-invoiced.controller';
import { thirdPartyInvoicedProvider } from './third-party-invoiced.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ThirdPartyInvoicedController],
  providers: [...thirdPartyInvoicedProvider, ThirdPartyInvoicedService],
})
export class ThirdPartyInvoicedModule {}
