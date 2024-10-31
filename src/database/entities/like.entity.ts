import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TableNameEnum } from './enums/table-name.enum';
import { PostEntity } from './post.entity';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.LIKES)
export class LikeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column('uuid')
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.likes)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @Column('uuid')
  post_id: string;
  @ManyToOne(() => PostEntity, (entity) => entity.likes)
  @JoinColumn({ name: 'post_id' })
  post?: PostEntity;
}
