import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { JwtService } from '@nestjs/jwt';

import { ConfigType, JwtConfig } from '../../../configs/config.type';
import { IJwtPayload } from '../models/interfaces/jwt-payload.interface';
import { ITokenPair } from '../models/interfaces/token-pair.interface';

@Injectable()
export class TokenService {
  private readonly jwtConfig: JwtConfig;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<ConfigType>,
  ) {
    this.jwtConfig = configService.get<JwtConfig>('jwt');
  }

  public async generateTokenPair(payload: IJwtPayload): Promise<ITokenPair> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.accessSecret,
      expiresIn: this.jwtConfig.accessExpiresIn,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.refreshSecret,
      expiresIn: this.jwtConfig.refreshExpiresIn,
    });
    return { accessToken, refreshToken };
  }

  public async verifyToken(token: string): Promise<any> {
    return await this.jwtService.verifyAsync(token);
  }
}
