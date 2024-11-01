import { Global, Module } from '@nestjs/common';

import { CommentRepository } from './services/comment.repository';
import { FollowRepository } from './services/follow.repository';
import { LikeRepository } from './services/like.repository';
import { PostRepository } from './services/post.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { TagRepository } from './services/tag.repository';
import { UserRepository } from './services/user.repository';

const repositories = [
  UserRepository,
  PostRepository,
  CommentRepository,
  TagRepository,
  LikeRepository,
  FollowRepository,
  RefreshTokenRepository,
];
@Global()
@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
