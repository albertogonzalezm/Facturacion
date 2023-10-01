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
  invoice_id: number;

  @Column({ type: 'int' })
  concept_id: number;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Invoice, (invoice) => invoice.invoiceDetails)
  @JoinColumn({ name: 'invoice_id' })
  invoice: Invoice;

  @ManyToOne(() => Concept, (concept) => concept.invoiceDetails)
  @JoinColumn({ name: 'concept_id' })
  concept: Concept;
}
