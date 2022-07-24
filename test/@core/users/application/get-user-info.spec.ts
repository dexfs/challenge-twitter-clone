import { User } from '#core/users/domain/entities/user';
import { UserModel } from '#core/users/infra/db/repository/sequelize/user-model';
import UserSequelizeRepository from '#core/users/infra/db/repository/sequelize/user-repository';
import UserRepository from '#core/users/domain/repositories/user.repository';
import GetUserInfoUseCase from '#core/users/application/get-user-info';
import { setupSequelize } from '../../../helpers/db';
import PostRepository from '#core/posts/domain/repositories/post.repository';
import { Post } from '#core/posts/domain/entities/post';
import PostSequelizeRepository from '#core/posts/infra/db/repository/sequelize/post-repository';
import { PostModel } from '#core/posts/infra/db/repository/sequelize/post-model';

describe('Post -> Application -> UseCase', () => {
  let repository: UserRepository.Repository<User>;
  let postRepository: PostRepository.Repository<Post>;
  setupSequelize({ models: [UserModel, PostModel] });

  beforeEach(async () => {
    repository = new UserSequelizeRepository(UserModel);
    postRepository = new PostSequelizeRepository(PostModel);
  });

  it('should return null if user not exists', async () => {
    const sut = new GetUserInfoUseCase.UseCase(repository, postRepository);
    const model = await sut.execute({ username: 'missingusername' });
    expect(model).toBeNull();
  });

  it('it should return an user by username correctly', async () => {
    const entity = new User({ username: 'test' });
    await UserModel.create(entity.toJSON());
    const sut = new GetUserInfoUseCase.UseCase(repository, postRepository);
    const expectedOutput = await sut.execute({ username: entity.username });
    expect(expectedOutput).toStrictEqual({
      username: entity.username,
      joinedAt: expect.any(String),
      totalPosts: 0,
    });
  });

  it('it should return the amount posts of a user passed', async () => {
    const entity = new User({ username: 'test' });
    await UserModel.create(entity.toJSON());
    await PostModel.create(
      new Post({ content: 'test', user_id: entity.id }).toJSON(),
    );
    const sut = new GetUserInfoUseCase.UseCase(repository, postRepository);
    const expectedOutput = await sut.execute({ username: entity.username });
    expect(expectedOutput).toStrictEqual({
      username: entity.username,
      joinedAt: expect.any(String),
      totalPosts: 1,
    });
  });
});
