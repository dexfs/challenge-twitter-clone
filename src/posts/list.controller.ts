import { Controller, Get, Inject, Query } from '@nestjs/common';

import ListPosts from '#core/posts/application/list-posts';
import { ListPostDto, ListPostDtoOutput } from './dto/list-post.dto';

@Controller('posts')
export class ListController {
  @Inject(ListPosts.UseCase)
  private listPostUseCase;

  @Get()
  async get(@Query() listParams: ListPostDto) {
    const post = await this.listPostUseCase.execute(listParams);
    return ListPostDtoOutput.toOutput(post);
  }
}
