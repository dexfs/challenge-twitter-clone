import UseCaseInterface from '#core/@shared/application/use-case';
import PostRepository from '#core/posts/domain/repositories/post.repository';
import { Post } from '#core/posts/domain/entities/post';
import { PostOutput } from '#core/@shared/application/dto/posts/post-output';

namespace ListPosts {
  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private postRepository: PostRepository.Repository<Post>) {}

    async execute(input?: Input): Promise<Output> {
      const posts = await this.postRepository.search({
        ...defaultFiltersValues,
        ...input,
      });
      if (!posts) return [];
      return posts.map((p) => p.toJSON());
    }
  }

  const defaultFiltersValues: Input = {
    limit: 10,
    offset: 0,
    all: true,
    order: [['created_at', 'DESC']],
  };
  export type Input = {
    limit?: number;
    offset?: number;
    startDate?: string;
    endDate?: string;
    all?: boolean;
    order?: [[string, string]];
    user_id?: string;
  };
  export type Output = PostOutput[];
}
export default ListPosts;
