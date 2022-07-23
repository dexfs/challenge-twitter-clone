import UserSequelizeRepository from '#core/users/infra/db/repository/sequelize/user-repository';
import { UserModel } from '#core/users';

export namespace USER_PROVIDERS {
  export namespace REPOSITORIES {
    export const USER_SEQUELIZE = {
      provide: 'UserSequelizeRepository',
      useFactory: () => {
        return new UserSequelizeRepository(UserModel);
      },
    };
  }

  export namespace USE_CASES {}
}
