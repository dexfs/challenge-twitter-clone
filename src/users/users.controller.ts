import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import GetUserInfo from '#core/users/application/get-user-info';
import GetUserFeed from '#core/users/application/get-user-feed';
import { UserFeedDto } from './dto/user-feed.dto';
import { ListPostDtoOutput } from '../posts/dto/list-post.dto';

@Controller('users')
export class UsersController {
  @Inject(GetUserInfo.UseCase)
  private getUserInfoUseCase;
  @Inject(GetUserFeed.UseCase)
  private getUserFeedUseCase;

  @Get(':username/feed')
  async feed(
    @Param('username') username: string,
    @Query() params: UserFeedDto,
  ) {
    const posts = await this.getUserFeedUseCase.execute({
      username,
      ...params,
    });
    return ListPostDtoOutput.toOutput(posts);
  }

  @Get(':username/info')
  async get(@Param('username') username: string) {
    return this.getUserInfoUseCase.execute({ username });
  }
}
