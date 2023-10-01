import { DataSource } from 'typeorm';
import { ThirdPartyInvoiced } from './entities/third-party-invoiced.entity';

export const thirdPartyInvoicedProvider = [
  {
    provide: 'THIRD_PARTY_INVOICED',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ThirdPartyInvoiced),
    inject: ['DATA_SOURCE'],
  },
];
