import { UserID } from '../../../../common/types/entities-id.type';

export interface IUserData {
  userId: UserID;
  deviceId: string;
  email: string;
}
