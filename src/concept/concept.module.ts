import { Module } from '@nestjs/common';
import { ConceptService } from './concept.service';
import { ConceptController } from './concept.controller';
import { DatabaseModule } from '../database/database.module';
import { conceptProvider } from './concept.provider';
import { invoiceProvider } from '../invoice/invoice.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ConceptController],
  providers: [...conceptProvider, ...invoiceProvider, ConceptService],
})
export class ConceptModule {}
