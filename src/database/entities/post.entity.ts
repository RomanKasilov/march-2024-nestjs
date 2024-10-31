import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TableNameEnum } from './enums/table-name.enum';
import { LikeEntity } from './like.entity';
import { CreateUpdateModel } from './models/createAt-updateAt.model';
import { TagEntity } from './tag.entity';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.POSTS)
export class PostEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('text', { nullable: true })
  body?: string;

  @Column('uuid')
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.posts)
  user?: UserEntity;

  @OneToMany(() => LikeEntity, (entity) => entity.post)
  likes?: LikeEntity[];

  @ManyToMany(() => TagEntity, (entity) => entity.posts)
  tags?: TagEntity[];
}
