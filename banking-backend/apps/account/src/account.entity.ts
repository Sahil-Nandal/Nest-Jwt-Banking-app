import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  accountNumber: number;

  @Column()
  userId: number; // Reference to the user (from Auth Microservice)

  @Column()
  balance: number;

  @Column({ default: 'Active' }) // active, closed, suspended
  status: string;
  
}
