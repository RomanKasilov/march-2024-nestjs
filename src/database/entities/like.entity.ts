import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { LikeID, PostID, UserID } from '../../common/types/entities-id.type';
import { TableNameEnum } from './enums/table-name.enum';
import { PostEntity } from './post.entity';
import { UserEntity } from './user.entity';

@Index(['user_id', 'post_id'], { unique: true })
@Entity(TableNameEnum.LIKES)
export class LikeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: LikeID;

  @CreateDateColumn()
  created: Date;

  @Column('uuid')
  user_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.likes)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @Column('uuid')
  post_id: PostID;
  @ManyToOne(() => PostEntity, (entity) => entity.likes)
  @JoinColumn({ name: 'post_id' })
  post?: PostEntity;
}
