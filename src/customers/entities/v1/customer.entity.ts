import { Transform } from 'class-transformer';
import { CreateCustomerDto } from 'src/customers/dtos/v1/create-customer.dto';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('int4')
  age: number;

  @Column('varchar')
  email: string;
}
