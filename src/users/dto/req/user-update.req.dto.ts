import { PartialType } from '@nestjs/mapped-types';

import { UserCreateReqDto } from './user-create.req.dto';

export class UserUpdateReqDto extends PartialType(UserCreateReqDto) {}
