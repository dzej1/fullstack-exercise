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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Article } from './entities/article.entity';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @ApiOperation({ summary: 'Create article' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 201, description: 'Article created.' })
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

  @ApiOperation({ summary: 'Get articles' })
  @ApiResponse({
    status: 200,
    type: Article,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @ApiOperation({ summary: 'Get article' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update article' })
  @ApiResponse({ status: 401, description: 'Unathorized.' })
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

  @ApiOperation({ summary: 'Delete article' })
  @ApiResponse({ status: 401, description: 'Unathorized.' })
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @UseGuards(AccessTokenAuthGuard)
  @Delete(':id')
  remove(@GetCurrentUserId() userId: number, @Param('id') id: string) {
    return this.articlesService.remove(+id, userId);
  }
}
