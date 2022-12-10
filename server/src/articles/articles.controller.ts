import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { GetCurrentUserId } from '../decorators/get-current-user-id.decorator';
import { AccessTokenAuthGuard } from '../auth/guards/access-token-auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';
import { RolesGuard } from '../users/guards/roles.guard';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @UseGuards(AccessTokenAuthGuard)
  @Post()
  create(
    @GetCurrentUserId() userId: number,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    return this.articlesService.create(createArticleDto, userId);
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @UseGuards(AccessTokenAuthGuard)
  @Patch(':id')
  update(
    @GetCurrentUserId() userId: number,
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articlesService.update(+id, updateArticleDto, userId);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @UseGuards(AccessTokenAuthGuard)
  @Delete(':id')
  remove(@GetCurrentUserId() userId: number, @Param('id') id: string) {
    return this.articlesService.remove(+id, userId);
  }
}
