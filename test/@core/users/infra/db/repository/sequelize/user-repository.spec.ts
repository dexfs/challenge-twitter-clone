import { User } from '#core/users/domain/entities/user';
import { UserModel } from '#core/users/infra/db/repository/sequelize/user-model';
import UserSequelizeRepository from '#core/users/infra/db/repository/sequelize/user-repository';
import { setupSequelize } from '../../../../../../helpers/db';

describe('User -> Infra -> Repository -> UserSequelizeRepository', () => {
  setupSequelize({ models: [UserModel] });

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
