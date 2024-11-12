import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { ApiFile } from '../../common/decorators/api-file.decorator';
import { UserID } from '../../common/types/entities-id.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { UpdateUserReqDto } from './models/dto/req/update-user.req.dto';
import { BaseUserResDto } from './models/dto/res/base-user.res.dto';
import { UserMapper } from './services/user-mapper';
import { UsersService } from './services/users.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  public async findMe(
    @CurrentUser() currentUserData: IUserData,
  ): Promise<BaseUserResDto> {
    const result = await this.usersService.findMe(currentUserData.userId);
    return UserMapper.toResDto(result);
  }

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

  @Delete('me')
  public async removeMe(
    @CurrentUser() currentUserData: IUserData,
  ): Promise<void> {
    await this.usersService.removeMe(currentUserData.userId);
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiFile('avatar', false, true)
  @Post('me/avatar')
  public async uploadAvatar(
    @CurrentUser() userData: IUserData,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    await this.usersService.uploadAvatar(userData, file);
  }

  @ApiBearerAuth()
  @Delete('me/avatar')
  public async deleteAvatar(@CurrentUser() userData: IUserData): Promise<void> {
    await this.usersService.deleteAvatar(userData);
  }

  @Get(':userId')
  public async findOne(
    @Param('userId', ParseUUIDPipe) id: UserID,
  ): Promise<BaseUserResDto> {
    const result = await this.usersService.findOne(id);
    return UserMapper.toResDto(result);
  }

  @Post(':userId/follow')
  public async follow(
    @Param('userId', ParseUUIDPipe) followingId: UserID,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.usersService.follow(userData.userId, followingId);
  }

  @Delete(':userId/follow')
  public async unfollow(
    @Param('userId', ParseUUIDPipe) followingId: UserID,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.usersService.unfollow(userData.userId, followingId);
  }
}
