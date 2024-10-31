import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CreateUpdateModel } from './models/createAt-updateAt.model';
import { PostEntity } from './post.entity';
import { UserEntity } from './user.entity';

@Entity('likes')
export class LikeEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('text', { nullable: true })
  body?: string;

  @ManyToOne(() => UserEntity, (entity) => entity.likes)
  user?: UserEntity;

  @ManyToOne(() => PostEntity, (entity) => entity.likes)
  post?: PostEntity;
}
