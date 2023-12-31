import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { DatabaseModule } from '../database/database.module';
import { invoiceProvider } from './invoice.provider';
import { thirdPartyInvoicedProvider } from '../third-party-invoiced/third-party-invoiced.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [InvoiceController],
  providers: [
    ...invoiceProvider,
    InvoiceService,
    ...thirdPartyInvoicedProvider,
  ],
})
export class InvoiceModule {}
