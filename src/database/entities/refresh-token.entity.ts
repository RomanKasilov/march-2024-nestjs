import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CreateUpdateModel } from './models/createAt-updateAt.model';
import { UserEntity } from './user.entity';

@Entity('refresh-tokens')
export class RefreshTokenEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  accessToken: string;

  @Column('text')
  deviceId: string;

  @ManyToOne(() => UserEntity, (entity) => entity.refreshTokens)
  user?: UserEntity;
}
