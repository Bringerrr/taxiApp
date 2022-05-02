import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { ArticleDto } from './article.dto';

@InputType()
export class UpdateArticleDto extends ArticleDto {
  @Field()
  @IsNotEmpty()
  id: number;
}
