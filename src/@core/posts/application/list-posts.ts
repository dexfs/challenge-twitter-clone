import UseCaseInterface from '#core/@shared/application/use-case';
import PostRepository from '#core/posts/domain/repositories/post.repository';
import { Post } from '#core/posts/domain/entities/post';

namespace ListPosts {
  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private postRepository: PostRepository.Repository<Post>) {}

    async execute(input?: Input): Promise<Output> {
      const posts = await this.postRepository.search({
        ...defaultFiltersValues,
        ...input,
      });
      if (!posts) return { items: [] };
      return { items: posts.map((p) => p.toJSON()) };
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
  };
  export type Output = {
    items: {
      id: string;
      content: string | null;
      user_id: string;
      is_quote: boolean;
      is_repost: boolean;
      created_at: Date;
      original_post_id: string | null;
      original_post_content: string | null;
      original_post_user_id: string | null;
      original_post_screen_name?: string | null;
    }[];
  };
}
export default ListPosts;
