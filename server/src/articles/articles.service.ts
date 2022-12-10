import { Injectable, Inject, ForbiddenException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @Inject('ARTICLE_REPOSITORY')
    private articleRepository: Repository<Article>,
  ) {}

  async create(
    createArticleDto: CreateArticleDto,
    userId: number,
  ): Promise<Article> {
    return this.articleRepository.save({ ...createArticleDto, userId });
  }

  async findAll(): Promise<Article[]> {
    return this.articleRepository.find({ relations: { comments: true } });
  }

  async findOne(id: number): Promise<Article> {
    return this.articleRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateArticleDto: UpdateArticleDto,
    userId: number,
  ): Promise<Article> {
    const article = await this.articleRepository.findOneBy({ id });

    if (article.userId !== userId) {
      throw new ForbiddenException();
    }

    return this.articleRepository.save({ id, userId, ...updateArticleDto });
  }

  async remove(id: number, userId: number): Promise<DeleteResult> {
    const article = await this.articleRepository.findOneBy({ id });

    if (article.userId !== userId) {
      throw new ForbiddenException();
    }

    return this.articleRepository.delete(id);
  }
}
