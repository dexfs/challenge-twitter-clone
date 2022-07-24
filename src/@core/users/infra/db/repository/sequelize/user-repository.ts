import { User } from '#core/users/domain/entities/user';
import UniqueEntityId from '#core/@shared/domain/value-objects/unique-entity-id.vo';
import UserRepository from '#core/users/domain/repositories/user.repository';
import { UserModel } from '#core/users/infra/db/repository/sequelize/user-model';

export default class UserSequelizeRepository
  implements UserRepository.Repository<User>
{
  constructor(private userModel: typeof UserModel) {}

  async findById(id: string): Promise<User> {
    const model = await this.userModel.findByPk(id);
    if (!model) return null;
    return new User(
      {
        username: model.username,
      },
      new UniqueEntityId(model.id),
    );
  }

  async insert(entitiy: User): Promise<void> {
    throw new Error('method not implemented');
  }

  update(entity: User): Promise<void> {
    throw new Error('method not implemented');
  }

  delete(id: string | UniqueEntityId): Promise<void> {
    throw new Error('method not implemented');
  }

  async findByUsername(username: string): Promise<User | null> {
    const model = await this.userModel.findOne({ where: { username } });
    if (!model) return null;

    return new User(
      {
        username: model?.username,
        created_at: new Date(model?.created_at),
      },
      new UniqueEntityId(model.id),
    );
  }
}
