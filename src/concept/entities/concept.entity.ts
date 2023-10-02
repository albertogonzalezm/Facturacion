import { InvoiceDetail } from 'src/invoice-detail/entities/invoice-detail.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Concept {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal' })
  unit_price: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'int' })
  invoice_id: number;

  @ManyToOne(() => Invoice, (invoice) => invoice.concepts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'invoice_id' })
  invoiceId: Invoice;

  @OneToMany(() => InvoiceDetail, (invoiceDetail) => invoiceDetail.conceptId, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  invoiceDetails: InvoiceDetail[];
}
