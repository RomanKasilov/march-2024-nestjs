import { BaseUserResDto } from '../../../../users/models/dto/res/base-user.res.dto';
import { TokenPairResDto } from './token-pair.res.dto';

export class AuthResDto {
  tokens: TokenPairResDto;
  user: BaseUserResDto;
}
