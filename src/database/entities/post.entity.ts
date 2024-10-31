import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { LikeEntity } from './like.entity';
import { UserEntity } from './user.entity';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(() => UserEntity, (entity) => entity.posts)
  user?: UserEntity;

  @OneToMany(() => LikeEntity, (entity) => entity.post)
  likes?: LikeEntity[];
}
