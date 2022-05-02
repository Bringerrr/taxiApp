import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ArticlesFitlerInput {
  //   @Field()
  //   tag?: string;

  @Field()
  creator?: string;

  //   @Field()
  //   favorites?: string;
}
