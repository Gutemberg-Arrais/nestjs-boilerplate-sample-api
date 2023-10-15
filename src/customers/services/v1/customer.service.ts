import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateCustomerDto } from '../../dtos/v1/create-customer.dto';
import { Messages } from '../../../resources/models/messages';
import { CustomerRepository } from '../../repositories/v1/customer.repository';
import { Customer } from '../../entities/v1/customer.entity';
import { CacheService } from '../../../resources/cache/cache.service';
import { CustomException } from 'src/resources/interceptors/exception';

@Injectable()
export class CustomerService {
  private readonly messages = new Messages();
  private readonly logger = new Logger(CustomerService.name);

  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly cacheService: CacheService,
  ) {}

  async create(
    customerDto: CreateCustomerDto,
    traceId: string,
  ): Promise<Customer> {
    try {
      this.logger.log(this.messages.startCustomerCreate, {
        metadata: { traceId },
      });

      const customer = plainToClass(Customer, customerDto);

      await this.customerRepository.create(customer);

      this.logger.log(this.messages.finishCustomerCreate, {
        metadata: { traceId },
      });

      return customer;
    } catch (error) {
      this.logger.log(this.messages.errorCustomerCreate, {
        metadata: {
          traceId,
          message: error.response.notification || error.message,
        },
      });
      throw error;
    }
  }

  async findAll(traceId: string): Promise<Customer[]> {
    try {
      this.logger.log(this.messages.startCustomerFindAll, {
        metadata: {
          traceId,
        },
      });

      const cacheCustomers = await this.cacheService.get('all-customers111');
      if (cacheCustomers) {
        return cacheCustomers;
      }

      const result = await this.customerRepository.findAll();

      if (!result.length) {
        throw new CustomException(
          'Nenhum cliente encontrado',
          traceId,
          HttpStatus.NOT_FOUND,
        );
      }

      await this.cacheService.set('all-customers111', result);

      this.logger.log(this.messages.finishCustomerFindAll, {
        metadata: {
          traceId,
        },
      });

      return result;
    } catch (error) {
      this.logger.error(this.messages.errorCustomerFindAll, {
        metadata: {
          traceId,
          message: error.response.notification || error.message,
        },
      });
      throw error;
    }
  }
}
