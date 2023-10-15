import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomersModule } from './customers/customer.module';
import { DataBaseModule } from './database.module';
import configuration from './resources/config/configuration';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Logger } from 'winston';
import { TraceIdMiddleware } from './resources/config/tracing';
import { ResponseInterceptor } from './resources/interceptors/response.interceptor';

@Module({
  imports: [
    Logger,
    ConfigModule.forRoot({
      load: [configuration],
      cache: true,
      isGlobal: true,
    }),
    DataBaseModule,
    CustomersModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TraceIdMiddleware).forRoutes('*');
  }
}
