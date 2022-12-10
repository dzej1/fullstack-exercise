import { IsString, IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  perex: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}