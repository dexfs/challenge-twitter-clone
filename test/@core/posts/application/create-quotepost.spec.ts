import { PostModel } from '#core/posts/infra/db/repository/sequelize/post-model';
import { Post } from '#core/posts/domain/entities/post';
import PostSequelizeRepository from '#core/posts/infra/db/repository/sequelize/post-repository';
import PostRepository from '#core/posts/domain/repositories/post.repository';
import UserRepository from '#core/users/domain/repositories/user.repository';
import { User } from '#core/users/domain/entities/user';
import UserSequelizeRepository from '#core/users/infra/db/repository/sequelize/user-repository';
import { UserModel } from '#core/users/infra/db/repository/sequelize/user-model';
import UniqueEntityId from '#core/@shared/domain/value-objects/unique-entity-id.vo';
import CreateQuotePost from '#core/posts/application/create-quotepost';
import { setupSequelize } from '../../../helpers/db';

describe('Post -> Application -> CreateQuotepost UseCase', () => {
  let postRepository: PostRepository.Repository<Post>;
  let userRepository: UserRepository.Repository<User>;
  setupSequelize({ models: [PostModel, UserModel] });

  beforeEach(async () => {
    postRepository = new PostSequelizeRepository(PostModel);
    userRepository = new UserSequelizeRepository(UserModel);
  });

  it('it should throw an exception when nonexistent post_id sent', async () => {
    const missingPostId = new UniqueEntityId();
    const user = new User({ username: 'test' });

    await UserModel.create(user.toJSON());

    const sut = new CreateQuotePost.UseCase(postRepository, userRepository);
    const promise = sut.execute({
      quote: '',
      user_id: user.id,
      post_id: missingPostId.value,
    });

    await expect(promise).rejects.toThrow();
  });

  it('it should throw an exception when nonexistent user sent', async () => {
    const missingUserId = new UniqueEntityId();
    const post = new Post({
      content: 'test_1',
      user_id: missingUserId.value,
    });

    await PostModel.create(post.toJSON());

    const sut = new CreateQuotePost.UseCase(postRepository, userRepository);
    const promise = sut.execute({
      quote: '',
      user_id: missingUserId.value,
      post_id: post.id,
    });
    await expect(promise).rejects.toThrow();
  });

  it('it should create a post correctly', async () => {
    const user = new User({ username: 'test' });
    const post = new Post({
      content: 'test_1',
      user_id: user.id,
    });

    await UserModel.create(user.toJSON());
    await PostModel.create(post.toJSON());

    const sut = new CreateQuotePost.UseCase(postRepository, userRepository);
    const postCreated = await sut.execute({
      quote: '',
      user_id: user.id,
      post_id: post.id,
    });
    const model = await PostModel.findByPk(postCreated.id);

    expect(model.toJSON()).toStrictEqual(postCreated);
  });
});
