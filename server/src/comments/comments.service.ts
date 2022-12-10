import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { DeleteResult, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Article } from '../articles/entities/article.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @Inject('COMMENT_REPOSITORY')
    private readonly commentRepository: Repository<Comment>,
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    @Inject('ARTICLE_REPOSITORY')
    private readonly articleRepository: Repository<Article>,
  ) {}

  async create(createCommentDto: CreateCommentDto, userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const article = await this.articleRepository.findOneBy({
      id: createCommentDto.articleId,
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    const comment = this.commentRepository.create({
      ...createCommentDto,
      userId,
    });
    await this.commentRepository.save(comment);

    return comment;
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
    userId: number,
  ): Promise<Comment> {
    const comment = await this.commentRepository.findOneBy({ id });

    if (comment.userId !== userId) {
      throw new ForbiddenException();
    }

    return this.commentRepository.save({ id, ...updateCommentDto });
  }

  async remove(id: number, userId: number): Promise<DeleteResult> {
    const comment = await this.commentRepository.findOneBy({ id });

    if (comment.userId !== userId) {
      throw new ForbiddenException();
    }

    return this.commentRepository.delete(id);
  }
}
