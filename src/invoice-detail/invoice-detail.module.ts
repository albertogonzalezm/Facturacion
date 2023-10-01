import { Module } from '@nestjs/common';
import { InvoiceDetailService } from './invoice-detail.service';
import { InvoiceDetailController } from './invoice-detail.controller';
import { DatabaseModule } from 'src/database/database.module';
import { invoiceDetailProvider } from './invoice-detail.provider';
import { invoiceProvider } from 'src/invoice/invoice.provider';
import { conceptProvider } from 'src/concept/concept.provider';

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
