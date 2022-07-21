import PostRepository from '#core/posts/domain/repositories/post.repository';
import { Post } from '#core/posts/domain/entities/post';
import UseCaseInterface from '#core/@shared/application/use-case';
import DomainError from '#core/@shared/errors/domain-error';
import UserRepository from '#core/users/domain/repositories/user.repository';
import { User } from '#core/users/domain/entities/user';

namespace CreateRepost {
  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(
      private postRepository: PostRepository.Repository<Post>,
      private userRepository: UserRepository.Repository<User>,
    ) {}

    async execute(input: CreateRepost.Input): Promise<CreateRepost.Output> {
      const post = await this.postRepository.findById(input.post_id);
      const user = await this.userRepository.findById(input.user_id);

      if (!post) throw new DomainError('Post not found!');
      if (!user) throw new DomainError('User not found!');

      const repost = new Post({
        user_id: input.user_id,
      });

      repost.repost({
        id: post.id,
        user_id: post.user_id,
        content: post.content,
        is_repost: post.is_repost,
        is_quote: post.is_quote,
        screen_name: user.username,
      });
      await this.postRepository.insert(repost);
      return repost.toJSON();
    }
  }

  export type Input = {
    post_id: string;
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

export default CreateRepost;
