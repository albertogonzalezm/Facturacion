import { DataSource } from 'typeorm';
import { Concept } from './entities/concept.entity';

export const conceptProvider = [
  {
    provide: 'CONCEPT',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Concept),
    inject: ['DATA_SOURCE'],
  },
];
