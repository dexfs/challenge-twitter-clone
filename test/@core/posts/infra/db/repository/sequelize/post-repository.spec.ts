import { PostModel } from '#core/posts/infra/db/repository/sequelize/post-model';
import PostRepository from '#core/posts/infra/db/repository/sequelize/post-repository';
import { Post } from '#core/posts/domain/entities/post';
import UniqueEntityId from '#core/@shared/domain/value-objects/unique-entity-id.vo';
import { setupSequelize } from '../../../../../../helpers/db';

describe('Post -> Application -> UseCase', () => {
  setupSequelize({ models: [PostModel] });

  it('it should create a post correctly', async () => {
    const userId = new UniqueEntityId();
    const entity = new Post({ content: 'Teste', user_id: userId.value });
    const sut = new PostRepository(PostModel);
    await sut.insert(entity);
    const model = await PostModel.findByPk(entity.id);
    expect(model.toJSON()).toStrictEqual(entity.toJSON());
  });

  it('it should create a repost correctly', async () => {
    const userId = new UniqueEntityId();
    const sutUserId = new UniqueEntityId();
    const originalPostEntity = new Post({
      content: 'Teste',
      user_id: userId.value,
    });
    const repostEntity = new Post({
      content: 'Teste2',
      user_id: sutUserId.value,
    });
    repostEntity.repost({
      user_id: originalPostEntity.user_id,
      content: originalPostEntity.content,
      is_repost: originalPostEntity.is_repost,
      is_quote: originalPostEntity.is_quote,
      screen_name: `user-${originalPostEntity.user_id}`,
      id: originalPostEntity.id,
    });
    const sut = new PostRepository(PostModel);
    await sut.insert(repostEntity);
    const model = await PostModel.findByPk(repostEntity.id);

    expect(model.toJSON()).toStrictEqual(repostEntity.toJSON());
  });

  it('it should create a quote post correctly', async () => {
    const userId = new UniqueEntityId();
    const sutUserId = new UniqueEntityId();
    const originalPostEntity = new Post({
      content: 'Teste',
      user_id: userId.value,
    });
    const repostEntity = new Post({
      content: 'Teste2',
      user_id: sutUserId.value,
    });
    repostEntity.quotePost('quote test', {
      user_id: originalPostEntity.user_id,
      content: originalPostEntity.content,
      is_repost: originalPostEntity.is_repost,
      is_quote: originalPostEntity.is_quote,
      screen_name: `user-${originalPostEntity.user_id}`,
      id: originalPostEntity.id,
    });
    const sut = new PostRepository(PostModel);
    await sut.insert(repostEntity);
    const model = await PostModel.findByPk(repostEntity.id);
    expect(model.toJSON()).toStrictEqual(repostEntity.toJSON());
  });
});
