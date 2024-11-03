import { PickType } from '@nestjs/swagger';

import { BaseUserResDto } from './base-user.res.dto';

export class ShortUserResDto extends PickType(BaseUserResDto, ['id', 'name']) {}
