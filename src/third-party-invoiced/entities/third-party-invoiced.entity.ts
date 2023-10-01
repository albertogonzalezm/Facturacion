import { Invoice } from 'src/invoice/entities/invoice.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class ThirdPartyInvoiced {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @OneToMany(() => Invoice, (invoice) => invoice.third_party_invoiced_id)
  invoices: Invoice[];
}
