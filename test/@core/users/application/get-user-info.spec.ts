import { Sequelize } from 'sequelize-typescript';

import { User } from '#core/users/domain/entities/user';
import { UserModel } from '#core/users/infra/db/repository/sequelize/user-model';
import UserSequelizeRepository from '#core/users/infra/db/repository/sequelize/user-repository';
import UserRepository from '#core/users/domain/repositories/user.repository';
import GetUserInfoUseCase from '#core/users/application/get-user-info';

describe('Post -> Application -> UseCase', () => {
  let sequelize: Sequelize;
  let repository: UserRepository.Repository<User>;
  beforeAll(() => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      host: ':memory:',
      logging: false,
      models: [UserModel],
    });
  });

  beforeEach(async () => {
    repository = new UserSequelizeRepository(UserModel);
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
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
