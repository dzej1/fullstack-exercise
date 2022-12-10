import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  contentMarkdown: string;

  @IsNumber()
  @IsNotEmpty()
  articleId: number;
}
