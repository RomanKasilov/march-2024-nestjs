import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import configuration from './configs/configuration';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    UsersModule,
    PostsModule,
    CommentsModule,
    AuthModule,
  ],
})
export class AppModule {}
