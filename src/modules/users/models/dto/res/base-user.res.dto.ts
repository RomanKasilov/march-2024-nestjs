import { ApiProperty } from '@nestjs/swagger';

import { UserID } from '../../../../../common/types/entities-id.type';

export class BaseUserResDto {
  @ApiProperty({ type: String }) // type for representing in swagger
  id: UserID;
  name: string;
  email: string;
  bio?: string;
  image?: string;
}
