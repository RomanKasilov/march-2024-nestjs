import * as path from 'node:path';

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigType, DatabaseConfigType } from '../../configs/config.type';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService<ConfigType>) => {
        const dataConfig = configService.get<DatabaseConfigType>('database');
        return {
          type: 'postgres',
          host: dataConfig.host,
          port: dataConfig.port,
          username: dataConfig.user,
          password: dataConfig.password,
          database: dataConfig.name,
          entities: [
            path.join(
              process.cwd(),
              'dist',
              'src',
              'database',
              'entities',
              '*.entity.js',
            ),
          ],
          migrations: [
            path.join(
              process.cwd(),
              'dist',
              'src',
              'database',
              'migrations',
              '*.js',
            ),
          ],
          synchronize: false, // no synchronize, we use migrations
          migrationsRun: false, //for autorun script "migration:run"
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class PostgresModule {}
