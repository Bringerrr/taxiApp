import { User } from '@app/user/decorators/user.decorator';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { UserEntity } from '@app/user/user.entity';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ArticleEntity } from './article.entity';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/createArticle.dto';

@Resolver('articles')
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Mutation(() => ArticleEntity)
  @UseGuards(AuthGuard)
  async createArticle(
    @Args('createArticle') createArticle: CreateArticleDto,
    @User() user: UserEntity,
  ): Promise<any> {
    console.log('createArticle user ', user);

    return await this.articleService.createArticle(createArticle, user);
  }
}
