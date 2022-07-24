import { PostModel } from '#core/posts/infra/db/repository/sequelize/post-model';
import { Post } from '#core/posts/domain/entities/post';
import PostSequelizeRepository from '#core/posts/infra/db/repository/sequelize/post-repository';
import PostRepository from '#core/posts/domain/repositories/post.repository';
import CreatePost from '#core/posts/application/create-post';
import { setupSequelize } from '../../../helpers/db';
import UserRepository from '#core/users/domain/repositories/user.repository';
import { User, UserModel } from '#core/users';
import UserSequelizeRepository from '#core/users/infra/db/repository/sequelize/user-repository';

describe('Post -> Application -> UseCase', () => {
  let postRepository: PostRepository.Repository<Post>;
  let userRepository: UserRepository.Repository<User>;

  setupSequelize({ models: [PostModel, UserModel] });

  beforeEach(async () => {
    postRepository = new PostSequelizeRepository(PostModel);
    userRepository = new UserSequelizeRepository(UserModel);
  });

  it('it should create a post correctly', async () => {
    const user = new User({ username: 'test' });

    await UserModel.create(user.toJSON());
    const sut = new CreatePost.UseCase(postRepository, userRepository);
    const postCreated = await sut.execute({
      content: 'Teste',
      user_id: user.id,
    });
    const model = await PostModel.findByPk(postCreated.id);
    expect(model.toJSON()).toStrictEqual(postCreated);
  });
});
