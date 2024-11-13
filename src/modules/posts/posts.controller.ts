import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { PostID } from '../../common/types/entities-id.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { CreatePostDto } from './models/dto/req/create-post.dto';
import { PostsQueryDto } from './models/dto/req/posts-query.dto';
import { UpdatePostDto } from './models/dto/req/update-post.dto';
import { PostResDto } from './models/dto/res/post.res.dto';
import { PostListResDto } from './models/dto/res/post-list.res.dto';
import { PostsMapper } from './services/posts.mapper';
import { PostsService } from './services/posts.service';

@ApiTags('posts')
@ApiBearerAuth()
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreatePostDto,
  ): Promise<PostResDto> {
    const result = await this.postsService.create(dto, userData.userId);
    return PostsMapper.toResDto(result);
  }

  @Get()
  public async findAll(
    @CurrentUser() userData: IUserData,
    @Query() query: PostsQueryDto,
  ): Promise<PostListResDto> {
    const [entities, total] = await this.postsService.findAll(userData, query);
    return PostsMapper.toResDtoList(entities, total, query);
  }

  @Get(':postId')
  public async findOne(
    @CurrentUser() userData: IUserData,
    @Param('postId', ParseUUIDPipe) postId: PostID,
  ): Promise<PostResDto> {
    const result = await this.postsService.findOne(userData, postId);
    return PostsMapper.toResDto(result);
  }

  @Patch(':postId')
  public async update(
    @CurrentUser() userData: IUserData,
    @Param('postId', ParseUUIDPipe) postId: PostID,
    @Body() dto: UpdatePostDto,
  ) {
    return await this.postsService.update(postId, dto, userData.userId);
  }

  @Post(':/postId/like')
  public async like(
    @CurrentUser() userData: IUserData,
    @Param('postId', ParseUUIDPipe) postId: PostID,
  ): Promise<void> {
    await this.postsService.like(postId, userData.userId);
  }
  @Delete(':/postId/like')
  public async unlike(
    @CurrentUser() userData: IUserData,
    @Param('postId', ParseUUIDPipe) postId: PostID,
  ): Promise<void> {
    await this.postsService.unlike(postId, userData.userId);
  }
}
