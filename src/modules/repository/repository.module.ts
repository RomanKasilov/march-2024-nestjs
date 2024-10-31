import { Global, Module } from '@nestjs/common';

import { PostRepository } from './services/post.repository';
import { UserRepository } from './services/user.repository';

const repositories = [UserRepository, PostRepository];
@Global()
@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
