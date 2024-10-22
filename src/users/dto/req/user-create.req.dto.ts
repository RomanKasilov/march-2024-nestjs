export class UserCreateReqDto {
  readonly name: string;
  readonly age?: number;
  readonly email: string;
  readonly password: string;
  readonly role: string;
}
