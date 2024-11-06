import { Injectable } from '@nestjs/common';

import { UserID } from '../../../common/types/entities-id.type';
import { UserEntity } from '../../../database/entities/user.entity';
import { UserRepository } from '../../repository/services/user.repository';
import { UpdateUserReqDto } from '../models/dto/req/update-user.req.dto';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}
  public async findMe(userId: UserID) {
    return `This action returns "me" user`;
  }

  public async updateMe(userId: UserID, dto: UpdateUserReqDto) {
    return `This action updates a #${userId} user`;
  }

  public async removeMe(userId: UserID) {
    return `This action removes a #${userId} user`;
  }

  public async findOne(userId: UserID): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id: userId });
  }
}
