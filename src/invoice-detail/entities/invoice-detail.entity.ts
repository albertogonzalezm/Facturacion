import { Invoice } from 'src/invoice/entities/invoice.entity';
import { Concept } from 'src/concept/entities/concept.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class InvoiceDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Invoice, (invoice) => invoice.invoiceDetails, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'invoice_id' })
  invoiceId: Invoice;

  @ManyToOne(() => Concept, (concept) => concept.invoiceDetails, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'concept_id' })
  conceptId: Concept;
}
