import { Injectable } from '@nestjs/common';

import { PostID } from '../../../common/types/entities-id.type';
import { CreatePostDto } from '../models/dto/req/create-post.dto';
import { UpdatePostDto } from '../models/dto/req/update-post.dto';

@Injectable()
export class PostsService {
  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: PostID) {
    return `This action returns a #${id} post`;
  }

  update(id: PostID, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: PostID) {
    return `This action removes a #${id} post`;
  }
}
