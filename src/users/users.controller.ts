import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import GetUserInfo from '#core/users/application/get-user-info';
import GetUserFeed from '#core/users/application/get-user-feed';
import { UserFeedDto } from './dto/user-feed.dto';

@Controller('users')
export class UsersController {
  @Inject(GetUserInfo.UseCase)
  private getUserInfoUseCase;
  @Inject(GetUserFeed.UseCase)
  private getUserFeedUseCase;

  @Get(':username/feed')
  feed(@Param('username') username: string, @Query() params: UserFeedDto) {
    console.log('only username');
    return this.getUserFeedUseCase.execute({ username, ...params });
  }

  @Get(':username/info')
  get(@Param('username') username: string) {
    console.log('username feed');
    return this.getUserInfoUseCase.execute({ username });
  }
}
