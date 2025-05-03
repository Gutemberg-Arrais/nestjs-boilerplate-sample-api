import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { CustomerService } from '../../services/v1/customer.service';
import { ICustomer } from '../../interfaces/v1/customer.interface';
import { CreateCustomerDto } from '../../dtos/v1/create-customer.dto';
import { Customer } from '../../entities/v1/customer.entity';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async getAll(@Headers('x-trace-id') traceId: string): Promise<Customer[]> {
    return await this.customerService.findAll(traceId);
  }

  @Post()
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
    @Headers('x-trace-id') traceId: string,
  ): Promise<ICustomer> {
    return await this.customerService.create(createCustomerDto, traceId);
  }
}
