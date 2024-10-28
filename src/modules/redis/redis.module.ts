import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import { ConfigType, RedisConfigType } from '../../configs/config.type';

@Module({
  providers: [
    {
      provide: 'REDIS',
      useFactory: (configService: ConfigService<ConfigType>) => {
        const redisConfig = configService.get<RedisConfigType>('redis');
        return new Redis({
          host: redisConfig.host,
          port: redisConfig.port,
          password: redisConfig.password,
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class RedisModule {}
