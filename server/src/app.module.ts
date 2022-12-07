import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [ArticlesModule, ImagesModule],
})
export class AppModule {}
