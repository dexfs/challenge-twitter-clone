import PostRepository from '#core/posts/domain/repositories/post.repository';
import { Post } from '#core/posts/domain/entities/post';
import UniqueEntityId from '#core/@shared/domain/value-objects/unique-entity-id.vo';
import { PostModel } from '#core/posts/infra/db/repository/sequelize/post-model';
import { Op, QueryTypes } from 'sequelize';
import format from 'date-fns/format';
import { Paginate } from '#core/@shared/infra/db/paginate';

export default class PostSequelizeRepository
  implements PostRepository.Repository<Post>, Paginate
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
    const { id: postId, ...post } = model.toJSON();
    return new Post(post, new UniqueEntityId(postId));
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

  async search(query: any = {}): Promise<{ posts: Post[]; count: number }> {
    const { page, size, order, ...filters } = query;
    let where = {};

    where = this._mountWhereDateFilter(where, filters);

    if (!filters.all) {
      where = Object.assign(where, { is_repost: false, is_quote: false });
    }

    if (filters.user_id) {
      where = Object.assign(where, { user_id: filters.user_id });
    }

    const queryResult = await this.postModel.findAndCountAll(
      this.paginate({ where, order }, page, size),
    );
    if (!queryResult.rows) return null;
    const posts = queryResult.rows.map((r) => {
      const { id, ...post } = r.toJSON();
      return new Post(post, new UniqueEntityId(id));
    });
    return { posts, count: queryResult.count };
  }

  async hasRepostByPostIdAndUserId(
    postId: string,
    userId: string,
  ): Promise<boolean> {
    const count = await this.postModel.count({
      where: {
        original_post_id: postId,
        user_id: userId,
        is_repost: true,
      },
    });

    return !!count;
  }

  async hasRechedPostLimitDay(params: {
    userId: string;
    limit: number;
    date: Date;
  }): Promise<boolean> {
    const sequelize = this.postModel.sequelize;
    const binds = {
      replacements: [format(params.date, 'yyyy-MM-dd'), params.userId],
      type: QueryTypes.SELECT,
    };
    const records: any = await sequelize.query(
      'SELECT COUNT(*) FROM posts WHERE DATE(posts.created_at) = ? AND user_id = ?',
      binds,
    );

    return records[0]?.count >= params.limit;
  }

  async countPostsByUser(userId: string): Promise<number> {
    const count = await this.postModel.count({
      where: {
        user_id: userId,
      },
    });

    return count;
  }

  paginate(query: any, page: number, pageSize: number) {
    const offset = (+page - 1) * pageSize;
    const limit = pageSize;

    return { ...query, offset, limit };
  }
}
