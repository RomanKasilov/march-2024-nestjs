import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { TableNameEnum } from './enums/table-name.enum';
import { LikeEntity } from './like.entity';
import { CreateUpdateModel } from './models/createAt-updateAt.model';
import { PostEntity } from './post.entity';
import { RefreshTokenEntity } from './refresh-token.entity';

@Entity(TableNameEnum.USERS)
export class UserEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column('boolean', { default: true })
  isActive: boolean;

  @Column('text', { nullable: true })
  bio?: string;

  @Column('text', { nullable: true })
  image?: string;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];

  @OneToMany(() => PostEntity, (entity) => entity.user)
  posts?: PostEntity[];

  @OneToMany(() => LikeEntity, (entity) => entity.user)
  likes?: LikeEntity[];

  // @VirtualColumn({
  //   query: () => 'SELECT CONCAT(firstName, lastName) FROM users WHERE id = id',
  // })
  // fullName: string;
}
