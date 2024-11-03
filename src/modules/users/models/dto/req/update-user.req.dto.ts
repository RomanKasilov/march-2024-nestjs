import { OmitType, PartialType } from '@nestjs/swagger';

import { BaseUserReqDto } from './base-user.req.dto';

export class UpdateUserReqDto extends PartialType(
  OmitType(BaseUserReqDto, ['email']),
) {}
