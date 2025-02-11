import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  accountId: number;

  @Column({ type: 'decimal' })
  amount: number;

  @Column()
  type: 'credit' | 'debit'; // Either a deposit or withdrawal

  @CreateDateColumn()
  createdAt: Date;
}
