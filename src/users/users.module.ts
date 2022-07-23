import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { USER_PROVIDERS } from './users.providers';

@Module({
  controllers: [UsersController],
  providers: [...Object.values(USER_PROVIDERS.REPOSITORIES)],
  exports: [...Object.values(USER_PROVIDERS.REPOSITORIES)],
})
export class UsersModule {}
