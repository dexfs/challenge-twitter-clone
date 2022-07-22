import PostRepository from '#core/posts/domain/repositories/post.repository';
import { Post } from '#core/posts/domain/entities/post';
import UniqueEntityId from '#core/@shared/domain/value-objects/unique-entity-id.vo';
import { PostModel } from '#core/posts/infra/db/repository/sequelize/post-model';
import { Op } from 'sequelize';

export default class PostSequelizeRepository
  implements PostRepository.Repository<Post>
{
  constructor(private postModel: typeof PostModel) {}

  private _mountWhereDateFilter(where, filters) {
    if (filters.startDate) {
      where = Object.assign(where, {
        created_at: { [Op.gte]: new Date(filters.startDate) },
      });
    }

    if (filters.endDate) {
      where = Object.assign(where, {
        created_at: !filters.startDate
          ? { [Op.lte]: new Date(filters.endDate) }
          : {
              [Op.between]: [new Date(filters.startDate), new Date(filters)],
            },
      });
    }

    return where;
  }

  async findById(id: string): Promise<Post> {
    const model = await this.postModel.findByPk(id);
    if (!model) return null;
    return new Post(model.toJSON());
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

  async search(query: any = {}): Promise<Post[]> {
    const { limit, offset, order, ...filters } = query;
    let where = {};

    where = this._mountWhereDateFilter(where, filters);

    if (!filters.all) {
      where = Object.assign(where, { is_repost: false, is_quote: false });
    }

    const { rows } = await this.postModel.findAndCountAll({
      where,
      order,
      limit,
      offset,
    });
    if (!rows) return null;
    return rows.map((r) => new Post(r.toJSON()));
  }

  async countPostsByUser(userId: string): Promise<number> {
    const count = await this.postModel.count({
      where: {
        user_id: userId,
      },
    });

    return count;
  }
}
