import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { ArticleEntity } from '../article.entity';

@ObjectType()
export class GetAllArticles {
  @Field((type) => [ArticleEntity])
  items: ArticleEntity[];

  @Field(() => Int)
  count: number;
}
