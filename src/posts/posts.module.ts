import { Module } from '@nestjs/common';

import { CreateController } from './create.controller';
import { POST_PROVIDERS } from './posts.providers';
import { USER_PROVIDERS } from '../users/users.providers';
import { ListController } from './list.controller';
import { RepostController } from './repost.controller';
import { QuoteController } from './quote.controller';

@Module({
  controllers: [
    ListController,
    CreateController,
    RepostController,
    QuoteController,
  ],
  providers: [
    ...Object.values(POST_PROVIDERS.REPOSITORIES),
    ...Object.values(USER_PROVIDERS.REPOSITORIES),
    ...Object.values(POST_PROVIDERS.USE_CASES),
  ],
})
export class PostsModule {}
