import { User } from '@app/user/decorators/user.decorator';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { UserEntity } from '@app/user/user.entity';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ArticleEntity } from './article.entity';
import { ArticleService } from './article.service';
import { ArticleDto } from './dto/article.dto';
import { GetAllArticles } from './dto/getAllArticles.dto';
import { QueryArticles } from './dto/queryArticles.dto';
import { UpdateArticleDto } from './dto/updateArticle.dto';

@Resolver('articles')
@UseGuards(AuthGuard)
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Mutation(() => ArticleEntity)
  async createArticle(
    @Args('createArticle') createArticle: ArticleDto,
    @User() user: UserEntity,
  ): Promise<ArticleEntity> {
    return await this.articleService.createArticle(createArticle, user);
  }

  @Query(() => ArticleEntity)
  async getArticle(@Args('id') id: number): Promise<ArticleEntity> {
    return await this.articleService.findById(id);
  }

  @Mutation(() => ArticleEntity)
  async updateArticle(
    @Args('updateArticle') updateArticle: UpdateArticleDto,
    @User() user: UserEntity,
  ): Promise<ArticleEntity> {
    return await this.articleService.updateArticle(updateArticle, user);
  }

  @Mutation(() => Boolean)
  async deleteArticle(
    @Args('id') id: number,
    @User() user: UserEntity,
  ): Promise<boolean> {
    return await this.articleService.deleteArticle(id, user);
  }

  @Query(() => GetAllArticles)
  async getAllArticles(
    @Args('query') query: QueryArticles,
  ): Promise<GetAllArticles> {
    return await this.articleService.getAllArticles(query);
  }
}
