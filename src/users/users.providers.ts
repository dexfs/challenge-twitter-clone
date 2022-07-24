import UserSequelizeRepository from '#core/users/infra/db/repository/sequelize/user-repository';
import { UserModel } from '#core/users';
import GetUserInfoUseCase from '#core/users/application/get-user-info';
import UserRepository from '#core/users/domain/repositories/user.repository';
import PostRepository from '#core/posts/domain/repositories/post.repository';

export namespace USER_PROVIDERS {
  export namespace REPOSITORIES {
    export const USER_SEQUELIZE_REPOSITORY = {
      provide: 'UserSequelizeRepository',
      useFactory: () => {
        return new UserSequelizeRepository(UserModel);
      },
    };
  }
  export namespace USE_CASES {
    export const GET_USER_INFO_USE_CASE = {
      provide: GetUserInfoUseCase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository,
        postRepository: PostRepository.Repository,
      ) => {
        console.log({ userRepository, postRepository });
        return new GetUserInfoUseCase.UseCase(userRepository, postRepository);
      },
      inject: ['UserSequelizeRepository', 'PostSequelizeRepository'],
    };
  }
}
