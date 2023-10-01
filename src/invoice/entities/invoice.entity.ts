import { Concept } from 'src/concept/entities/concept.entity';
import { InvoiceDetail } from 'src/invoice-detail/entities/invoice-detail.entity';
import { ThirdPartyInvoiced } from 'src/third-party-invoiced/entities/third-party-invoiced.entity';
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
  total: string;

  @Column({ type: 'int' })
  third_party_invoiced_id: number;

  @ManyToOne(
    () => ThirdPartyInvoiced,
    (thirdPartyInvoiced) => thirdPartyInvoiced.invoices,
  )
  @JoinColumn({ name: 'third_party_invoiced_id' })
  thirdParrtInvoiced: ThirdPartyInvoiced;

  @OneToMany(() => Concept, (concept) => concept.invoice_id)
  concepts: Concept[];

  @OneToMany(() => InvoiceDetail, (invoiceDetail) => invoiceDetail.invoice_id)
  invoiceDetails: InvoiceDetail[];
}