import PostRepository from '#core/posts/domain/repositories/post.repository';
import { Post } from '#core/posts/domain/entities/post';
import UniqueEntityId from '#core/@shared/domain/value-objects/unique-entity-id.vo';
import { PostModel } from '#core/posts/infra/db/repository/sequelize/post-model';

export default class PostSequelizeRepository
  implements PostRepository.Repository<Post>
{
  constructor(private postModel: typeof PostModel) {}

  findById(id: string | UniqueEntityId): Promise<Post> {
    return Promise.resolve(undefined);
  }

  async insert(entitiy: Post): Promise<void> {
    const toPersistence = {
      ...entitiy.toJSON(),
      original_post_id: entitiy.original_post_id,
    };
    await this.postModel.create(toPersistence);
  }

  update(entity: Post): Promise<void> {
    return Promise.resolve(undefined);
  }

  delete(id: string | UniqueEntityId): Promise<void> {
    return Promise.resolve(undefined);
  }
}