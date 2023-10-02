import { Invoice } from '../../invoice/entities/invoice.entity';
import { Concept } from '../../concept/entities/concept.entity';
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

  @ManyToOne(() => Invoice, (invoice) => invoice.invoice_details, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'invoice_id' })
  invoiceId: Invoice;

  @ManyToOne(() => Concept, (concept) => concept.invoice_details, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'concept_id' })
  conceptId: Concept;
}
