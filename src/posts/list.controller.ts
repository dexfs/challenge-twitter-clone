import { Controller, Get, Inject, Query } from '@nestjs/common';

import ListPosts from '#core/posts/application/list-posts';

@Controller('posts')
export class ListController {
  @Inject(ListPosts.UseCase)
  private listPostUseCase;

  @Get()
  get(@Query() listParams: any) {
    return this.listPostUseCase.execute(listParams);
  }
}
