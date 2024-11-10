import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';

import { PostID, UserID } from '../../../common/types/entities-id.type';
import { PostEntity } from '../../../database/entities/post.entity';
import { TagEntity } from '../../../database/entities/tag.entity';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { PostRepository } from '../../repository/services/post.repository';
import { TagRepository } from '../../repository/services/tag.repository';
import { CreatePostDto } from '../models/dto/req/create-post.dto';
import { PostsQueryDto } from '../models/dto/req/posts-query.dto';
import { UpdatePostDto } from '../models/dto/req/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly tagRepository: TagRepository,
  ) {}

  public async create(dto: CreatePostDto, userId: UserID): Promise<PostEntity> {
    const tags = await this.createTags(dto.tags);
    return await this.postRepository.save(
      this.postRepository.create({ ...dto, tags, user_id: userId }),
    );
  }

  public async findAll(
    userData: IUserData,
    query: PostsQueryDto,
  ): Promise<[PostEntity[], number]> {
    return await this.postRepository.findAll(userData, query);
  }

  public async update(postId: PostID, dto: UpdatePostDto, userId: UserID) {
    return `This action updates a #${postId} post`;
  }

  public async remove(postId: PostID) {
    return `This action removes a #${postId} post`;
  }
  private async createTags(tags: string[]): Promise<TagEntity[]> {
    if (!tags || !tags.length) return [];

    const entities = await this.tagRepository.findBy({ name: In(tags) });
    const existingTags = entities.map((tag) => tag.name);
    const newTags = tags.filter((tag) => !existingTags.includes(tag));
    const newEntities = await this.tagRepository.save(
      newTags.map((tag) => this.tagRepository.create({ name: tag })),
    );
    return [...entities, ...newEntities];
  }
}
