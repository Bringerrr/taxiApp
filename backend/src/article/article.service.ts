import { User } from '@app/user/decorators/user.decorator';
import { UserEntity } from '@app/user/user.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { ArticleDto } from './dto/article.dto';
import { QueryArticles } from './dto/queryArticles.dto';
import { UpdateArticleDto } from './dto/updateArticle.dto';

@Injectable()
export class ArticleService {
  private readonly logger = new Logger(ArticleService.name);
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createArticle(
    createArticleInput: ArticleDto,
    currentUser: UserEntity,
  ): Promise<ArticleEntity> {
    const article = new ArticleEntity();

    Object.assign(article, createArticleInput);

    if (!article.tagList) {
      article.tagList = [];
    }

    article.creator = currentUser;

    return await this.articleRepository.save(article);
  }

  async updateArticle(
    updateArticleInput: UpdateArticleDto,
    currentUser: UserEntity,
  ): Promise<ArticleEntity> {
    const { id } = updateArticleInput;
    const article = await this.findById(id);

    console.log('get', article);

    Object.assign(article, updateArticleInput);

    return await this.articleRepository.save(article);
  }

  async deleteArticle(id: number, currentUser: UserEntity): Promise<boolean> {
    await this.articleRepository.delete({
      id,
    });

    return true;
  }

  async getAllArticles(
    query: QueryArticles,
  ): Promise<{ count: number; items: ArticleEntity[] }> {
    this.logger.log(`getting articles`);

    const {
      filters,
      pagination: { limit, offset },
    } = query;

    const queryBuider = getRepository(ArticleEntity)
      .createQueryBuilder('articles')
      .leftJoinAndSelect('articles.creator', 'creator')
      .orderBy('articles.createdAt', 'DESC')
      .offset(offset)
      .limit(limit);

    if (filters.creator) {
      const creator = await this.userRepository.findOne({
        username: filters.creator,
      });

      console.log('creator', creator);

      queryBuider.andWhere('articles.creatorId = :id', {
        id: creator.id,
      });
    }

    const articles = await queryBuider.getMany();
    const count = await queryBuider.getCount();

    // try {
    //   const count = await this.articleRepository.count(where);
    //   const items = await this.articleRepository.find({
    //     where,
    //     order: {
    //       created: 'DESC',
    //     },
    //     skip: query.paginaation.offset,
    //     take: query.paginaation.limit,
    //   });

    return {
      count,
      items: articles,
    };
  }

  findById(id: number): Promise<ArticleEntity> {
    return this.articleRepository.findOne({ id });
  }
}
