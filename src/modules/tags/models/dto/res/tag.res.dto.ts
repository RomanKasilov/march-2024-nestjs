import { ApiProperty } from '@nestjs/swagger';

import { TagID } from '../../../../../common/types/entities-id.type';

export class TagResDto {
  @ApiProperty({ type: String })
  id: TagID;
  name: string;
  postCount: number;
}
