import { Controller, Get, Inject, Param } from '@nestjs/common';
import GetUserInfo from '#core/users/application/get-user-info';

@Controller('users')
export class UsersController {
  @Inject(GetUserInfo.UseCase)
  private getUserInfoUseCase;

  @Get(':username')
  get(@Param('username') username: string) {
    return this.getUserInfoUseCase.execute({ username });
  }
}
