import { Sequelize } from 'sequelize-typescript';

import { User } from '#core/users/domain/entities/user';
import { UserModel } from '#core/users/infra/db/repository/sequelize/user-model';
import UserSequelizeRepository from '#core/users/infra/db/repository/sequelize/user-repository';

describe('User -> Infra -> Repository -> UserSequelizeRepository', () => {
  let sequelize: Sequelize;
  beforeAll(() => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      host: ':memory:',
      logging: false,
      models: [UserModel],
    });
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should return null if user not exists', async () => {
    const sut = new UserSequelizeRepository(UserModel);
    const model = await sut.findByUsername('missingusername');
    expect(model).toBeNull();
  });

  it('it should return an user by username correctly', async () => {
    const entity = new User({ username: 'test' });
    await UserModel.create(entity.toJSON());
    const sut = new UserSequelizeRepository(UserModel);
    const model = await sut.findByUsername(entity.username);
    expect(model.toJSON()).toStrictEqual(entity.toJSON());
  });
});
