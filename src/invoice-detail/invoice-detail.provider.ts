import { DataSource } from 'typeorm';
import { InvoiceDetail } from './entities/invoice-detail.entity';

export const invoiceDetailProvider = [
  {
    provide: 'INVOICE_DETAIL',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(InvoiceDetail),
    inject: ['DATA_SOURCE'],
  },
];
