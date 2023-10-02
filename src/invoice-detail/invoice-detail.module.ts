import { Module } from '@nestjs/common';
import { InvoiceDetailService } from './invoice-detail.service';
import { InvoiceDetailController } from './invoice-detail.controller';
import { DatabaseModule } from '../database/database.module';
import { invoiceDetailProvider } from './invoice-detail.provider';
import { invoiceProvider } from '../invoice/invoice.provider';
import { conceptProvider } from '../concept/concept.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [InvoiceDetailController],
  providers: [
    ...invoiceDetailProvider,
    ...invoiceProvider,
    ...conceptProvider,
    InvoiceDetailService,
  ],
})
export class InvoiceDetailModule {}
