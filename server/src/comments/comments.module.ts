import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { commentProviders } from './comment.providers';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from '../users/user.providers';
import { articleProviders } from '../articles/article.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CommentsController],
  providers: [
    ...commentProviders,
    ...userProviders,
    ...articleProviders,
    CommentsService,
  ],
})
export class CommentsModule {}
