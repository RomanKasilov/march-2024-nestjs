import { IsOptional } from 'class-validator';

export class UserQueryListReqDto {
  @IsOptional()
  readonly search?: string;

  @IsOptional()
  readonly page?: number;

  @IsOptional()
  readonly limit?: number;

  @IsOptional()
  readonly sort?: string;
}
