import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { PostID, UserID } from '../../common/types/entities-id.type';
import { CommentEntity } from './comment.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { LikeEntity } from './like.entity';
import { CreateUpdateModel } from './models/createAt-updateAt.model';
import { TagEntity } from './tag.entity';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.POSTS)
export class PostEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: PostID;

  @Column('text')
  title: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('text', { nullable: true })
  body?: string;

  @Column('uuid')
  user_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.posts)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @ManyToMany(() => TagEntity, (entity) => entity.posts)
  tags?: TagEntity[];

  @OneToMany(() => LikeEntity, (entity) => entity.post)
  likes?: LikeEntity[];

  @OneToMany(() => CommentEntity, (entity) => entity.post)
  comments?: CommentEntity[];
}
