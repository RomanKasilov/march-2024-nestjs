import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserID } from '../../common/types/entities-id.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { UpdateUserReqDto } from './models/dto/req/update-user.req.dto';
import { BaseUserResDto } from './models/dto/res/base-user.res.dto';
import { UserMapper } from './services/user-mapper';
import { UsersService } from './services/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get('me')
  public async findMe(
    @CurrentUser() currentUserData: IUserData,
  ): Promise<BaseUserResDto> {
    const result = await this.usersService.findMe(currentUserData.userId);
    return UserMapper.toResDto(result);
  }

  @ApiBearerAuth()
  @Patch('me')
  public async updateMe(
    @CurrentUser() currentUserData: IUserData,
    @Body() dto: UpdateUserReqDto,
  ): Promise<BaseUserResDto> {
    const result = await this.usersService.updateMe(
      currentUserData.userId,
      dto,
    );
    return UserMapper.toResDto(result);
  }

  @ApiBearerAuth()
  @Delete('me')
  public async removeMe(
    @CurrentUser() currentUserData: IUserData,
  ): Promise<void> {
    await this.usersService.removeMe(currentUserData.userId);
  }

  @SkipAuth()
  @Get(':userId')
  public async findOne(
    @Param('userId', ParseUUIDPipe) id: UserID,
  ): Promise<BaseUserResDto> {
    const result = await this.usersService.findOne(id);
    return UserMapper.toResDto(result);
  }

  @ApiBearerAuth()
  @Post(':userId/follow')
  public async follow(
    @Param('userId', ParseUUIDPipe) followingId: UserID,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.usersService.follow(userData.userId, followingId);
  }

  @ApiBearerAuth()
  @Delete(':userId/follow')
  public async unfollow(
    @Param('userId', ParseUUIDPipe) followingId: UserID,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.usersService.unfollow(userData.userId, followingId);
  }
}
