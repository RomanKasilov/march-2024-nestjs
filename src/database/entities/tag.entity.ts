import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/createAt-updateAt.model';
import { PostEntity } from './post.entity';

@Entity(TableNameEnum.TAGS)
export class TagEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @ManyToMany(() => PostEntity, (entity) => entity.tags)
  @JoinTable()
  posts?: PostEntity[];
}
