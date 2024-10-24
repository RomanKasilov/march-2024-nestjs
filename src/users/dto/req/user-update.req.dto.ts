import { OmitType } from '@nestjs/swagger';

import { UserBaseReqDto } from './user-base.req.dto';

export class UserUpdateReqDto extends OmitType(UserBaseReqDto, [
  'email',
  'role',
]) {}
