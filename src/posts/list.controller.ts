import {
  Controller,
  DefaultValuePipe,
  Get,
  Inject,
  ParseBoolPipe,
  Query,
} from '@nestjs/common';

import ListPosts from '#core/posts/application/list-posts';
import { ListPostDto } from './dto/list-post.dto';

@Controller('posts')
export class ListController {
  @Inject(ListPosts.UseCase)
  private listPostUseCase;

  @Get()
  get(
    @Query() listParams: ListPostDto,
    @Query('all', new DefaultValuePipe(true), ParseBoolPipe) all: boolean,
  ) {
    return this.listPostUseCase.execute({ ...listParams, all });
  }
}
