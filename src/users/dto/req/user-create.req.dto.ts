import { PickType } from '@nestjs/swagger';

import { UserBaseReqDto } from './user-base.req.dto';

export class UserCreateReqDto extends PickType(UserBaseReqDto, [
  'name',
  'age',
  'email',
  'password',
  'role',
]) {}
