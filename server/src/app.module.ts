import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { ImagesModule } from './images/images.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ArticlesModule,
    ImagesModule,
    UsersModule,
    AuthModule,
    CommentsModule,
  ],
})
export class AppModule {}
