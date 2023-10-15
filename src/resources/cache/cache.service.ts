import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheService: Cache) {}

  async get(key: string): Promise<any> {
    const result = await this.cacheService.get(key);
    return result;
  }

  async set(key: string, value: any): Promise<void> {
    await this.cacheService.set(key, value);
  }
}
