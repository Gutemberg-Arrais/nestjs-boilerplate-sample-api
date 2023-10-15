import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Logger } from 'winston';
import { CustomerService } from './services/v1/customer.service';
import { CustomerController } from './controllers/v1/customer.controller';
import { CustomerRepository } from './repositories/v1/customer.repository';
import { Customer } from './entities/v1/customer.entity';
import { CacheService } from 'src/resources/cache/cache.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [
    CustomerService,
    CustomerRepository,
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    CacheService,
  ],
  controllers: [CustomerController],
})
export class CustomersModule {}
