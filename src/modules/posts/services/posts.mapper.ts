import { Injectable } from '@nestjs/common';

import { PostEntity } from '../../../database/entities/post.entity';
import { UserMapper } from '../../users/services/user-mapper';
import { PostResDto } from '../models/dto/res/post.res.dto';

@Injectable()
export class PostsMapper {
  public static toResDto(data: PostEntity): PostResDto {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      body: data.body,
      created: data.created,
      updated: data.updated,
      tags: data.tags ? data.tags.map((tag) => tag.name) : [],
      user: data.user ? UserMapper.toResDto(data.user) : null,
    };
  }
}
