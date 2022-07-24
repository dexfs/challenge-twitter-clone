import UseCaseInterface from '#core/@shared/application/use-case';
import PostRepository from '#core/posts/domain/repositories/post.repository';
import { Post } from '#core/posts/domain/entities/post';
import { PostOutput } from '#core/@shared/application/dto/posts/post-output';
import {
  PaginationOutput,
  PaginationOutputMapper,
} from '#core/@shared/application/dto/pagination-output';

namespace ListPosts {
  export class UseCase
    implements UseCaseInterface<Input, PaginationOutput<Post>>
  {
    constructor(private postRepository: PostRepository.Repository<Post>) {}

    async execute(input?: Input): Promise<PaginationOutput<Post>> {
      const filters = {
        ...defaultFiltersValues,
        ...input,
      };
      const { posts, count } = await this.postRepository.search(filters);

      const items = posts ? posts.map((p) => p.toJSON()) : [];
      return PaginationOutputMapper.toOuput<Post>(items, {
        count,
        pageSize: filters.size,
        page: filters.page,
      });
    }
  }

  const defaultFiltersValues: Input = {
    size: 10,
    page: 1,
    all: true,
    order: [['created_at', 'DESC']],
  };
  export type Input = {
    size?: number;
    page?: number;
    startDate?: string;
    endDate?: string;
    all?: boolean;
    order?: [[string, string]];
    user_id?: string;
  };
  export type Output = PostOutput[];
}
export default ListPosts;
