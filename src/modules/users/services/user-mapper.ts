import { UserEntity } from '../../../database/entities/user.entity';
import { BaseUserResDto } from '../models/dto/res/base-user.res.dto';

export class UserMapper {
  public static toResDto(user: UserEntity): BaseUserResDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      image: user.image,
    };
  }
}
