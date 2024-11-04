import { Injectable } from '@nestjs/common';

import { CommentID } from '../../../common/types/entities-id.type';
import { CreateCommentDto } from '../models/dto/req/create-comment.dto';
import { UpdateCommentDto } from '../models/dto/req/update-comment.dto';

@Injectable()
export class CommentsService {
  create(createCommentDto: CreateCommentDto) {
    return 'This action adds a new comment';
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: CommentID) {
    return `This action returns a #${id} comment`;
  }

  update(id: CommentID, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: CommentID) {
    return `This action removes a #${id} comment`;
  }
}
