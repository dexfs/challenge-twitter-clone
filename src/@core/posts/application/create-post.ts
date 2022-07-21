import UseCaseInterface from '#core/@shared/application/use-case';
import PostRepository from '#core/posts/domain/repositories/post.repository';
import { Post } from '#core/posts/domain/entities/post';

namespace CreatePost {
  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private postRepository: PostRepository.Repository<Post>) {}

    async execute(input: Input): Promise<Output> {
      const entity = new Post({
        content: input.content,
        user_id: input.user_id,
      });
      await this.postRepository.insert(entity);
      return {
        ...entity.toJSON(),
        original_post_id: entity.original_post_id,
      };
    }
  }

  export type Input = {
    content: string;
    user_id: string;
  };

  export type Output = {
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
  };
}
export default CreatePost;
