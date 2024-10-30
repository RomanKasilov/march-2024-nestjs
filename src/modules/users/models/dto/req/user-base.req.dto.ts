import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotIn,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';

import { TransformHelper } from '../../../../../common/helpers/transform.helper';
import { GenderEnum } from '../../enums/gender.enum';

export class UserBaseReqDto {
  @Transform(TransformHelper.trim)
  @IsString()
  @Length(3, 21)
  name: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(199)
  @IsOptional()
  age?: number = 30;

  @Transform(({ value }) => value.trim().toLowerCase())
  @IsString()
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  @ApiProperty({ example: 'example@gmail.com' })
  email: string;

  @IsEnum(GenderEnum)
  @IsOptional()
  @ApiProperty({ example: 'male' })
  gender?: GenderEnum;

  @Transform(TransformHelper.trim)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{6,}$/, {
    message:
      'Password must contain at least 1 letter, 1 number, and be at least 6 characters long',
  })
  @IsNotIn(['P@ssoword!'])
  @ApiProperty({ example: 'P@ssoword1!' })
  password: string;
}
