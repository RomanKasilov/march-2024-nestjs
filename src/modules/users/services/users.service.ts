import { Injectable } from '@nestjs/common';

import { UserID } from '../../../common/types/entities-id.type';
import { UserRepository } from '../../repository/services/user.repository';
import { UpdateUserReqDto } from '../models/dto/req/update-user.req.dto';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  findOne(id: UserID) {
    return `This action returns a #${id} user`;
  }

  update(id: UserID, dto: UpdateUserReqDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: UserID) {
    return `This action removes a #${id} user`;
  }
}
