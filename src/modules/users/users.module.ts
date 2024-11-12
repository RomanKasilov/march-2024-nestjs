import { forwardRef, Module } from '@nestjs/common';

import { FileStorageModule } from '../file-storage/file-storage.module';
import { PostsModule } from '../posts/posts.module';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [forwardRef(() => PostsModule), FileStorageModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
