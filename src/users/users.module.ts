import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { USER_PROVIDERS } from './users.providers';
import { POST_PROVIDERS } from '../posts/posts.providers';

@Module({
  controllers: [UsersController],
  providers: [
    ...Object.values(USER_PROVIDERS.REPOSITORIES),
    ...Object.values(POST_PROVIDERS.REPOSITORIES),
    ...Object.values(USER_PROVIDERS.USE_CASES),
  ],
  exports: [
    ...Object.values(USER_PROVIDERS.REPOSITORIES),
    ...Object.values(USER_PROVIDERS.USE_CASES),
  ],
})
export class UsersModule {}
