import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '@app/user/user.entity';

@ObjectType()
@Entity({ name: 'articles' })
export class ArticleEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column({ default: '' })
  description: string;

  @Field()
  @Column({ default: '' })
  body: string;

  @Field((type) => [String])
  @Column('simple-array')
  tagList: string[];

  @Field()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Field()
  @Column({ default: 0 })
  favorites: number;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.articles, { eager: true })
  creator: UserEntity;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
