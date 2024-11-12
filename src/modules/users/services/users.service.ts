import { ConflictException, Injectable } from '@nestjs/common';

import { UserID } from '../../../common/types/entities-id.type';
import { UserEntity } from '../../../database/entities/user.entity';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { ContentType } from '../../file-storage/enums/content-type.enum';
import { FileStorageService } from '../../file-storage/services/file-storage.service';
import { FollowRepository } from '../../repository/services/follow.repository';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UpdateUserReqDto } from '../models/dto/req/update-user.req.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly fileStorageService: FileStorageService,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly followRepository: FollowRepository,
  ) {}
  public async findMe(userId: UserID): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id: userId });
  }

  public async updateMe(
    userId: UserID,
    dto: UpdateUserReqDto,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });
    // const prevEntity = { ...user };

    // .merge() multiple entities into single. UserEntity (in const user) will change
    this.userRepository.merge(user, dto);
    return await this.userRepository.save(user);
  }

  public async removeMe(userId: UserID): Promise<void> {
    await this.userRepository.update({ id: userId }, { deleted: new Date() });
    await this.refreshTokenRepository.delete({ user_id: userId });
  }

  public async uploadAvatar(
    userData: IUserData,
    file: Express.Multer.File,
  ): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    const pathToFile = await this.fileStorageService.uploadFile(
      file,
      ContentType.IMAGE,
      userData.userId,
    );
    if (user.image) {
      await this.fileStorageService.deleteFile(user.image);
    }
    await this.userRepository.save({ ...user, image: pathToFile });
  }
  public async deleteAvatar(userData: IUserData): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    if (user.image) {
      await this.fileStorageService.deleteFile(user.image);
      await this.userRepository.save({ ...user, image: null });
    }
  }

  public async findOne(userId: UserID): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id: userId });
  }

  public async follow(userId: UserID, followingId: UserID): Promise<void> {
    if (userId === followingId) {
      throw new ConflictException('You cannot follow yourself');
    }
    await this.isUserExistOrThrow(followingId);

    const follow = await this.followRepository.findOneBy({
      follower_id: userId,
      following_id: followingId,
    });
    if (follow) {
      throw new ConflictException('You already follow this user');
    }
    await this.followRepository.save(
      this.followRepository.create({
        follower_id: userId,
        following_id: followingId,
      }),
    );
  }

  public async unfollow(userId: UserID, followingId: UserID): Promise<void> {
    if (userId === followingId) {
      throw new ConflictException('You cannot unfollow yourself');
    }
    await this.isUserExistOrThrow(followingId);
    const follow = await this.followRepository.findOneBy({
      follower_id: userId,
      following_id: followingId,
    });
    if (!follow) {
      throw new ConflictException('You do not follow this user');
    }
    await this.followRepository.delete({
      follower_id: userId,
      following_id: followingId,
    });
  }

  private async isUserExistOrThrow(userId: UserID): Promise<void> {
    const user = await this.userRepository.findOneBy({
      id: userId,
      // deleted: IsNull()
    });
    if (!user) {
      throw new ConflictException('User not found');
    }
  }
}
