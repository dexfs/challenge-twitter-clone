import { Sequelize } from 'sequelize-typescript';
import { PostModel } from '#core/posts/infra/db/repository/sequelize/post-model';
import { Post } from '#core/posts/domain/entities/post';
import PostSequelizeRepository from '#core/posts/infra/db/repository/sequelize/post-repository';
import PostRepository from '#core/posts/domain/repositories/post.repository';
import CreatePost from '#core/posts/application/create-post';
import UniqueEntityId from '#core/@shared/domain/value-objects/unique-entity-id.vo';

describe('Post -> Application -> UseCase', () => {
  let sequelize: Sequelize;
  let repository: PostRepository.Repository<Post>;
  beforeAll(() => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      host: ':memory:',
      logging: false,
      models: [PostModel],
    });
  });

  beforeEach(async () => {
    repository = new PostSequelizeRepository(PostModel);
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('it should create a post correctly', async () => {
    const userId = new UniqueEntityId();
    const sut = new CreatePost.UseCase(repository);
    const postCreated = await sut.execute({
      content: 'Teste',
      user_id: userId.value,
    });
    const model = await PostModel.findByPk(postCreated.id);
    expect(model.toJSON()).toStrictEqual(postCreated);
  });
});
