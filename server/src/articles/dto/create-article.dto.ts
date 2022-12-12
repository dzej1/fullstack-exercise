import { IsString, IsNotEmpty, IsNumber, ValidateIf } from 'class-validator';

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

  @IsNumber()
  @ValidateIf((object, value) => value !== null)
  imageId!: number | null;
}
