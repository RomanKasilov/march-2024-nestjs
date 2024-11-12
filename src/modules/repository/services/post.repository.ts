import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { PostID } from '../../../common/types/entities-id.type';
import { PostEntity } from '../../../database/entities/post.entity';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { PostsQueryDto } from '../../posts/models/dto/req/posts-query.dto';

@Injectable()
export class PostRepository extends Repository<PostEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(PostEntity, dataSource.manager);
  }

  public async findAll(
    userData: IUserData,
    query: PostsQueryDto,
  ): Promise<[PostEntity[], number]> {
    const qb = this.createQueryBuilder('post');
    qb.leftJoinAndSelect('post.tags', 'tag');
    qb.leftJoinAndSelect('post.user', 'user');
    qb.leftJoinAndSelect(
      'user.followings',
      'following',
      'following.follower_id = :userId',
      { userId: userData.userId },
    );

    if (query.search) {
      qb.andWhere('CONCAT(post.title, post.description) ILIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }
    if (query.tag) {
      qb.andWhere('tag.name = :tag', { tag: query.tag });
    }

    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async getById(
    userData: IUserData,
    postId: PostID,
  ): Promise<PostEntity> {
    const qb = this.createQueryBuilder('post');
    qb.leftJoinAndSelect('post.tags', 'tag');
    qb.leftJoinAndSelect('post.user', 'user');
    qb.leftJoinAndSelect(
      'user.followings',
      'following',
      'following.follower_id = :userId',
      { userId: userData.userId },
    );
    qb.where('post.id = :postId', { postId });
    return await qb.getOne();
  }
}
