import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AccessTokenAuthGuard } from '../auth/guards/access-token-auth.guard';
import { GetCurrentUserId } from '../decorators/get-current-user-id.decorator';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AccessTokenAuthGuard)
  @Post()
  create(
    @GetCurrentUserId() userId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(createCommentDto, userId);
  }

  @UseGuards(AccessTokenAuthGuard)
  @Patch(':id')
  update(
    @GetCurrentUserId() userId: number,
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(+id, updateCommentDto, userId);
  }

  @UseGuards(AccessTokenAuthGuard)
  @Delete(':id')
  remove(@GetCurrentUserId() userId: number, @Param('id') id: string) {
    return this.commentsService.remove(+id, userId);
  }
}
