import UseCaseInterface from '#core/@shared/application/use-case';
import {
  PostOutput,
  PostOutputMapper,
} from '#core/@shared/application/dto/posts/post-output';
import PostRepository from '#core/posts/domain/repositories/post.repository';
import { Post } from '#core/posts';
import UserRepository from '#core/users/domain/repositories/user.repository';
import { User } from '#core/users';
import DomainError from '#core/@shared/errors/domain-error';
import { defaultSearchInput } from '#core/@shared/application/dto/posts/post-input';

namespace GetUserFeed {
  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(
      private userRepository: UserRepository.Repository<User>,
      private postRepository: PostRepository.Repository<Post>,
    ) {}

    async execute(input: Input): Promise<Output> {
      const user = await this.userRepository.findByUsername(input.username);
      if (!user) throw new DomainError('User not found');
      const posts = await this.postRepository.search({
        ...defaultInput,
        ...input,
        user_id: user.id,
      });
      if (!posts) return [];
      return posts.map((p) => PostOutputMapper.toOutput(p));
      // show a feed of the posts the user has mad(reposts and quoteposts)
      // starting with the latest 5 posts
      // Older posts are loaded on-demand
    }
  }

  const defaultInput = {
    ...defaultSearchInput,
    limit: 5,
    offset: 0,
  };

  export type Input = {
    username: string;
    limit?: number;
  };

  export type Output = PostOutput[];
}

export default GetUserFeed;
