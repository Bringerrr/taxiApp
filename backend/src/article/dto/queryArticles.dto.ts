import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { ArticlesFitlerInput } from '../inputs/filters.input';
import { PageInput } from '@app/generalInputs/pagination.input';

@InputType()
export class QueryArticles {
  @Field(() => ArticlesFitlerInput, { nullable: true })
  filters?: ArticlesFitlerInput;

  @Field(() => PageInput, { nullable: true })
  pagination?: PageInput;
}
