import {
  Body,
  Controller,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import CreateRepost from '#core/posts/application/create-repost';
import { RepostDto } from './dto/repost.dto';

@Controller('posts')
export class RepostController {
  @Inject(CreateRepost.UseCase)
  private readonly repostUseCase;

  @Post('repost/:postId')
  create(
    @Param('postId', new ParseUUIDPipe()) postId: string,
    @Body() payload: RepostDto,
  ) {
    return this.repostUseCase.execute({ ...payload, post_id: postId });
  }
}
