import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './configs/configuration';
import { CommentsModule } from './modules/comments/comments.module';
import { PostgresModule } from './modules/postgres/postgres.module';
import { PostsModule } from './modules/posts/posts.module';
import { RedisModule } from './modules/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    PostgresModule,
    RedisModule,
    PostsModule,
    CommentsModule,
  ],
})
export class AppModule {}
