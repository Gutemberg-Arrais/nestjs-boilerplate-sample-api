import { Customer } from 'src/customers/entities/v1/customer.entity';
import { EntitySchema } from 'typeorm';

export const CustomerSchema = new EntitySchema<Customer>({
  name: 'Customer',
  target: Customer,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
    },
    age: {
      type: String,
    },
    email: {
      type: String,
    },
  },
});
