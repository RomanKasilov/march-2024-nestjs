export class UserQueryListReqDto {
  readonly search?: string;
  readonly page?: number;
  readonly limit?: number;
  readonly sort?: string;
}
