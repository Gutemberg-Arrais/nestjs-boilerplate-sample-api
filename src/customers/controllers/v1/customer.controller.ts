import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { CustomerService } from '../../services/v1/customer.service';
import { ICustomer } from '../../interfaces/v1/customer.interface';
import { CreateCustomerDto } from '../../dtos/v1/create-customer.dto';
import { Customer } from '../../entities/v1/customer.entity';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // @UseInterceptors(CacheInterceptor)
  // @CacheTTL(60000)
  // @CacheKey('all-customers')
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
