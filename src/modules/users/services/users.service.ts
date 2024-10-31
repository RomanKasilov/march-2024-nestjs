import { Injectable } from '@nestjs/common';

import { UserRepository } from '../../repository/services/user.repository';
import { UserCreateReqDto } from '../models/dto/req/user-create.req.dto';
import { UserUpdateReqDto } from '../models/dto/req/user-update.req.dto';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}
  create(dto: UserCreateReqDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, dto: UserUpdateReqDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
