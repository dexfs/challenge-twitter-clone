import PostRepository from '#core/posts/domain/repositories/post.repository';
import { Post } from '#core/posts/domain/entities/post';
import { setupSequelize } from '../../../helpers/db';
import { PostModel } from '#core/posts/infra/db/repository/sequelize/post-model';
import PostSequelizeRepository from '#core/posts/infra/db/repository/sequelize/post-repository';
import { UserModel } from '#core/users/infra/db/repository/sequelize/user-model';
import { User } from '#core/users/domain/entities/user';
import ListPosts from '#core/posts/application/list-posts';

const makeBulkPost = (amount = 10) => {
  const posts = [];
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const chance = require('chance')();
  const user = new User({ username: 'test' });
  const date = new Date();
  for (let i = 0; i < amount; i++) {
    posts.push(
      new Post({
        content: chance.paragraph(),
        user_id: user.id,
        created_at: new Date(date.getTime() + i * 5),
      }).toJSON(),
    );
  }
  return { user, posts };
};

describe('Post -> ListPost use case', () => {
  let postRepository: PostRepository.Repository<Post>;

  setupSequelize({ models: [PostModel, UserModel] });
  beforeAll(() => {
    jest.useFakeTimers({ now: new Date('2022-07-21') });
  });
  beforeEach(async () => {
    postRepository = new PostSequelizeRepository(PostModel);
  });

  it('should list and order correctly', async () => {
    const { posts } = makeBulkPost(20);
    await PostModel.bulkCreate(posts);
    const { count, rows } = await PostModel.findAndCountAll({
      limit: 10,
      order: [['created_at', 'DESC']],
    });
    const sut = new ListPosts.UseCase(postRepository);
    const result = await sut.execute();

    expect(result).toHaveProperty('items');
    expect(result.items).toHaveLength(10);
    expect(result.items[0]).toStrictEqual(rows[0].toJSON());
  });

  it('should list correctly when filter startDate sent', async () => {
    const { user, posts } = makeBulkPost(20);
    await PostModel.bulkCreate(posts);
    const post = new Post({
      content: 'post de 24/07/2022',
      user_id: user.id,
      created_at: new Date('2022-07-24'),
    });
    await PostModel.create(post.toJSON());

    const sut = new ListPosts.UseCase(postRepository);
    const result = await sut.execute({ startDate: '2022-07-24' });
    expect(result).toHaveProperty('items');
    expect(result.items).toHaveLength(1);
    expect(result.items[0]).toStrictEqual(post.toJSON());
  });

  it('should list correctly when filter endDate sent', async () => {
    const { user, posts } = makeBulkPost(20);
    await PostModel.bulkCreate(posts);
    const post = new Post({
      content: 'post de 24/07/2022',
      user_id: user.id,
      created_at: new Date('2022-07-24'),
    });
    await PostModel.create(post.toJSON());

    const sut = new ListPosts.UseCase(postRepository);
    const result = await sut.execute({ endDate: '2022-07-24' });
    expect(result).toHaveProperty('items');
    expect(result.items).toHaveLength(10);
    expect(result.items[0]).toStrictEqual(post.toJSON());
  });

  it('should list correctly when filter startDate and endDate sent', async () => {
    const { user, posts } = makeBulkPost(20);
    await PostModel.bulkCreate(posts);
    const postStartDate = new Post({
      content: 'post de 24/07/2022',
      user_id: user.id,
      created_at: new Date('2022-07-24'),
    });
    const postEndDate = new Post({
      content: 'post de 27/07/2022',
      user_id: user.id,
      created_at: new Date('2022-07-27'),
    });
    await PostModel.bulkCreate([postStartDate.toJSON(), postEndDate.toJSON()]);

    const sut = new ListPosts.UseCase(postRepository);
    const result = await sut.execute({
      startDate: '2022-07-24',
      endDate: '2022-07-27',
    });
    expect(result).toHaveProperty('items');
    expect(result.items).toHaveLength(2);
    expect(result.items[0]).toStrictEqual(postEndDate.toJSON());
    expect(result.items[1]).toStrictEqual(postStartDate.toJSON());
  });

  it('should list correctly when filter[all] is false and endDate sent', async () => {
    const { user, posts } = makeBulkPost(20);
    await PostModel.bulkCreate(posts);
    const newPost = new Post({
      content: 'post de 24/07/2022',
      user_id: user.id,
      created_at: new Date('2022-07-24'),
    });

    newPost.repost(posts[0]);
    await PostModel.create(newPost.toJSON());

    const sut = new ListPosts.UseCase(postRepository);
    const result = await sut.execute({ all: false });

    expect(result).toHaveProperty('items');
    expect(result.items).toHaveLength(10);
    expect(result.items[0].id).not.toBe(newPost.id);
  });
});
