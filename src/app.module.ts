import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThirdPartyInvoicedModule } from './third-party-invoiced/third-party-invoiced.module';
import { ConceptModule } from './concept/concept.module';
import { InvoiceModule } from './invoice/invoice.module';
import { InvoiceDetailModule } from './invoice-detail/invoice-detail.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ThirdPartyInvoicedModule,
    ConceptModule,
    InvoiceModule,
    InvoiceDetailModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
