import PostSequelizeRepository from '#core/posts/infra/db/repository/sequelize/post-repository';
import CreatePost from '#core/posts/application/create-post';
import PostRepository from '#core/posts/domain/repositories/post.repository';
import CreateRepost from '#core/posts/application/create-repost';
import UserRepository from '#core/users/domain/repositories/user.repository';
import { USER_PROVIDERS } from '../users/users.providers';
import ListPosts from '#core/posts/application/list-posts';
import CreateQuotePost from '#core/posts/application/create-quotepost';
import { PostModel } from '#core/posts';

export namespace POST_PROVIDERS {
  export namespace REPOSITORIES {
    export const POST_SEQUELIZE_REPOSITORY = {
      provide: 'PostSequelizeRepository',
      useFactory: () => {
        return new PostSequelizeRepository(PostModel);
      },
    };
  }

  export namespace USE_CASES {
    export const LIST_POST_USE_CASE = {
      provide: ListPosts.UseCase,
      useFactory: (postRepository: PostRepository.Repository) => {
        return new ListPosts.UseCase(postRepository);
      },
      inject: [REPOSITORIES.POST_SEQUELIZE_REPOSITORY.provide],
    };

    export const CREATE_POST_USE_CASE = {
      provide: CreatePost.UseCase,
      useFactory: (
        postRepository: PostRepository.Repository,
        userRepository: UserRepository.Repository,
      ) => {
        return new CreatePost.UseCase(postRepository, userRepository);
      },
      inject: [
        REPOSITORIES.POST_SEQUELIZE_REPOSITORY.provide,
        USER_PROVIDERS.REPOSITORIES.USER_SEQUELIZE.provide,
      ],
    };

    export const CREATE_REPOST_USE_CASE = {
      provide: CreateRepost.UseCase,
      useFactory: (
        postRepository: PostRepository.Repository,
        userRepository: UserRepository.Repository,
      ) => {
        return new CreateRepost.UseCase(postRepository, userRepository);
      },
      inject: [
        REPOSITORIES.POST_SEQUELIZE_REPOSITORY.provide,
        USER_PROVIDERS.REPOSITORIES.USER_SEQUELIZE.provide,
      ],
    };

    export const CREATE_QUOTE_POST_USE_CASE = {
      provide: CreateQuotePost.UseCase,
      useFactory: (
        postRepository: PostRepository.Repository,
        userRepository: UserRepository.Repository,
      ) => {
        return new CreateQuotePost.UseCase(postRepository, userRepository);
      },
      inject: [
        REPOSITORIES.POST_SEQUELIZE_REPOSITORY.provide,
        USER_PROVIDERS.REPOSITORIES.USER_SEQUELIZE.provide,
      ],
    };
  }
}
