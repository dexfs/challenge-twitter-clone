import { Sequelize } from 'sequelize-typescript';
import { PostModel } from '#core/posts/infra/db/repository/sequelize/post-model';
import { Post } from '#core/posts/domain/entities/post';
import PostSequelizeRepository from '#core/posts/infra/db/repository/sequelize/post-repository';
import PostRepository from '#core/posts/domain/repositories/post.repository';
import { CreatePost } from '#core/posts/application/create-post';
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
    const sut = new CreatePost(repository);
    const postCreated = await sut.execute({
      content: 'Teste',
      user_id: userId.value,
    });
    const model = await PostModel.findByPk(postCreated.id);
    expect(model.toJSON()).toStrictEqual(postCreated);
  });

  // it('it should create a repost correctly', async () => {
  //   const originalPostEntity = new Post({ content: 'Teste', user_id: 1 });
  //   const repostEntity = new Post({ content: 'Teste2', user_id: 1 });
  //   repostEntity.repost({
  //     user_id: originalPostEntity.user_id,
  //     content: originalPostEntity.content,
  //     is_repost: originalPostEntity.is_repost,
  //     is_quote: originalPostEntity.is_quote,
  //     screen_name: `user-${originalPostEntity.user_id}`,
  //     id: originalPostEntity.id,
  //   });
  //   const sut = new PostRepository(PostModel);
  //   await sut.insert(repostEntity);
  //   const model = await PostModel.findByPk(repostEntity.id);
  //
  //   expect(model.toJSON()).toStrictEqual(repostEntity.toJSON());
  // });
  //
  // it('it should create a quote post correctly', async () => {
  //   const originalPostEntity = new Post({ content: 'Teste', user_id: 1 });
  //   const repostEntity = new Post({ content: 'Teste2', user_id: 1 });
  //   repostEntity.quotePost('quote test', {
  //     user_id: originalPostEntity.user_id,
  //     content: originalPostEntity.content,
  //     is_repost: originalPostEntity.is_repost,
  //     is_quote: originalPostEntity.is_quote,
  //     screen_name: `user-${originalPostEntity.user_id}`,
  //     id: originalPostEntity.id,
  //   });
  //   const sut = new PostRepository(PostModel);
  //   await sut.insert(repostEntity);
  //   const model = await PostModel.findByPk(repostEntity.id);
  //   expect(model.toJSON()).toStrictEqual(repostEntity.toJSON());
  // });
});
