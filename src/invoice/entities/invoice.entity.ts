import { Concept } from '../../concept/entities/concept.entity';
import { InvoiceDetail } from '../../invoice-detail/entities/invoice-detail.entity';
import { ThirdPartyInvoiced } from '../../third-party-invoiced/entities/third-party-invoiced.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column({ type: 'date' })
  date_of_issue: Date;

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  total: number;

  @Column({ type: 'int' })
  third_party_invoiced_id: number;

  @ManyToOne(
    () => ThirdPartyInvoiced,
    (thirdPartyInvoiced) => thirdPartyInvoiced.invoices,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'third_party_invoiced_id' })
  thirdPartyInvoicedId: ThirdPartyInvoiced;

  @OneToMany(() => Concept, (concept) => concept.invoiceId, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  concepts: Concept[];

  @OneToMany(() => InvoiceDetail, (invoiceDetail) => invoiceDetail.invoiceId, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  invoice_details: InvoiceDetail[];
}
