import { User } from '#core/users/domain/entities/user';
import { UserModel } from '#core/users/infra/db/repository/sequelize/user-model';
import UserSequelizeRepository from '#core/users/infra/db/repository/sequelize/user-repository';
import UserRepository from '#core/users/domain/repositories/user.repository';
import GetUserInfoUseCase from '#core/users/application/get-user-info';
import { setupSequelize } from '../../../helpers/db';

describe('Post -> Application -> UseCase', () => {
  let repository: UserRepository.Repository<User>;
  setupSequelize({ models: [UserModel] });

  beforeEach(async () => {
    repository = new UserSequelizeRepository(UserModel);
  });

  it('should return null if user not exists', async () => {
    const sut = new GetUserInfoUseCase.UseCase(repository);
    const model = await sut.execute({ username: 'missingusername' });
    expect(model).toBeNull();
  });

  it('it should return an user by username correctly', async () => {
    const entity = new User({ username: 'test' });
    await UserModel.create(entity.toJSON());
    const sut = new GetUserInfoUseCase.UseCase(repository);
    const expectedOutput = await sut.execute({ username: entity.username });
    expect(expectedOutput).toStrictEqual(entity.toJSON());
  });
});
